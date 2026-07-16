export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    window.matchMedia("(pointer: coarse)").matches ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
}

export function getFrameBufferProfile() {
  const mobile = isMobileViewport();
  return {
    mobile,
    minFramesToStart: mobile ? 12 : 48,
    warmPreload: mobile ? 48 : 280,
    bufferRadius: mobile ? 14 : 60,
    maxCache: mobile ? 32 : 150,
    maxConcurrent: mobile ? 3 : 10,
  };
}
