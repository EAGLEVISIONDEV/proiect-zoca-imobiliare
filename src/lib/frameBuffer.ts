export type FrameBitmap = ImageBitmap | HTMLImageElement;

const isChromium =
  typeof navigator !== "undefined" &&
  /Chrome|Chromium|Edg/.test(navigator.userAgent) &&
  !/Firefox/.test(navigator.userAgent);

async function decodeFrame(url: string): Promise<FrameBitmap> {
  if (isChromium) {
    const response = await fetch(url);
    const blob = await response.blob();
    return createImageBitmap(blob);
  }

  const img = new Image();
  img.decoding = "async";
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
  });

  await img.decode();
  try {
    return await createImageBitmap(img);
  } catch {
    return img;
  }
}

export class FrameBuffer {
  private cache = new Map<number, FrameBitmap>();
  private inflight = new Map<number, Promise<FrameBitmap | null>>();
  private readonly bufferRadius: number;
  private readonly maxCache: number;
  private activeLoads = 0;
  private readonly maxConcurrent: number;

  constructor(
    private frameCount: number,
    private framePath: (index: number) => string,
    options?: { bufferRadius?: number; maxCache?: number; maxConcurrent?: number },
  ) {
    this.bufferRadius = options?.bufferRadius ?? 28;
    this.maxCache = options?.maxCache ?? 80;
    this.maxConcurrent = options?.maxConcurrent ?? 6;
  }

  get(index: number): FrameBitmap | undefined {
    return this.cache.get(index);
  }

  has(index: number): boolean {
    return this.cache.has(index);
  }

  async load(index: number): Promise<FrameBitmap | null> {
    const clamped = Math.max(0, Math.min(this.frameCount - 1, index));
    const cached = this.cache.get(clamped);
    if (cached) return cached;

    const pending = this.inflight.get(clamped);
    if (pending) return pending;

    const task = this.loadOne(clamped);
    this.inflight.set(clamped, task);
    return task;
  }

  prefetchAround(center: number) {
    const start = Math.max(0, center - this.bufferRadius);
    const end = Math.min(this.frameCount - 1, center + this.bufferRadius);

    for (let i = start; i <= end; i++) {
      if (!this.cache.has(i) && !this.inflight.has(i)) {
        void this.load(i);
      }
    }

    this.prune(center);
  }

  async preloadInitial(count: number, onProgress?: (ratio: number) => void) {
    const target = Math.min(count, this.frameCount);
    let done = 0;

    const batch = async (from: number, to: number) => {
      const jobs: Promise<void>[] = [];
      for (let i = from; i <= to; i++) {
        jobs.push(
          this.load(i).then(() => {
            done++;
            onProgress?.(done / target);
          }),
        );
      }
      await Promise.all(jobs);
    };

    const chunkSize = 12;
    for (let start = 0; start < target; start += chunkSize) {
      const end = Math.min(target - 1, start + chunkSize - 1);
      await batch(start, end);
    }
  }

  private async loadOne(index: number): Promise<FrameBitmap | null> {
    while (this.activeLoads >= this.maxConcurrent) {
      await new Promise((r) => setTimeout(r, 8));
    }

    this.activeLoads++;
    try {
      const bitmap = await decodeFrame(this.framePath(index + 1));
      this.cache.set(index, bitmap);
      return bitmap;
    } catch {
      return null;
    } finally {
      this.activeLoads--;
      this.inflight.delete(index);
    }
  }

  private prune(center: number) {
    if (this.cache.size <= this.maxCache) return;

    const keepStart = Math.max(0, center - this.bufferRadius * 2);
    const keepEnd = Math.min(this.frameCount - 1, center + this.bufferRadius * 2);

    for (const key of this.cache.keys()) {
      if (key < keepStart || key > keepEnd) {
        const bitmap = this.cache.get(key);
        if (bitmap && "close" in bitmap) {
          (bitmap as ImageBitmap).close();
        }
        this.cache.delete(key);
      }
    }
  }

  destroy() {
    for (const bitmap of this.cache.values()) {
      if ("close" in bitmap) {
        (bitmap as ImageBitmap).close();
      }
    }
    this.cache.clear();
    this.inflight.clear();
  }
}

export function getCanvasDpr(): number {
  if (typeof window === "undefined") return 1;
  const raw = window.devicePixelRatio || 1;
  const isMobile = window.innerWidth < 768;
  return Math.min(raw, isMobile ? 1.5 : 2);
}
