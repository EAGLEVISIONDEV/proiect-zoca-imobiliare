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
    minFramesToStart: mobile ? 6 : 48,
    warmPreload: mobile ? 24 : 280,
    bufferRadius: mobile ? 10 : 60,
    maxCache: mobile ? 24 : 150,
    maxConcurrent: mobile ? 2 : 10,
  };
}
