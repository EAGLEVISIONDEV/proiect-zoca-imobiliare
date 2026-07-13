/** Full 1080p horizontal (1920×1080) frame sequence */
export const FRAME_WIDTH = 1920;
export const FRAME_HEIGHT = 1080;

/** Intro: 720p → 1080p max quality, native 24fps (241 frames, full 10s) */
export const INTRO_FRAME_COUNT = 241;
/** Mansion FPV tour at native 1080p, 5fps (70s, 350 frames) */
export const MANSION_FRAME_COUNT = 350;
export const FRAME_COUNT = INTRO_FRAME_COUNT + MANSION_FRAME_COUNT;
export const INTRO_PROGRESS_END = INTRO_FRAME_COUNT / FRAME_COUNT;

export const framePath = (index: number) =>
  `/frames/frame_${String(index).padStart(4, "0")}.jpg`;
