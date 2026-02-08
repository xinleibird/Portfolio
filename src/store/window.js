import { INITIAL_Z_INDEX, INITIAL_WINDOWS } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const createWindowStore = create(
  immer((set) => ({
    windows: INITIAL_WINDOWS,
    nextZIndex: INITIAL_Z_INDEX + 1,

    /** @param {string} key */
    openWindw: (key, data = null) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[key];
          window.isOpen = true;
          window.zIndex = state.nextZIndex;
          window.data = data ?? window.data;
          state.nextZIndex++;
        },
      ),

    /** @param {string} key */
    closeWindow: (key) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[key];
          window.isOpen = false;
          window.zIndex = INITIAL_Z_INDEX;
          window.data = null;
        },
      ),
    /** @param {string} key */
    focusWindow: (key) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[key];
          window.isOpen = false;
          window.zIndex = state.nextZIndex++;
        },
      ),
  })),
);

export default createWindowStore;
