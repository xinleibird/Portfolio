import { INITIAL_Z_INDEX, INITIAL_WINDOWS } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    windows: INITIAL_WINDOWS,
    nextZIndex: INITIAL_Z_INDEX + 1,

    /** @param {string} windowKey */
    openWindow: (windowKey, data = null) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[windowKey];
          if (!window) {
            return;
          }
          window.isOpen = true;
          window.zIndex = state.nextZIndex;
          window.data = data ?? window.data;
          state.nextZIndex++;
        },
      ),

    /** @param {string} windowkey */
    closeWindow: (windowkey) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[windowkey];
          if (!window) {
            return;
          }
          window.isOpen = false;
          window.zIndex = INITIAL_Z_INDEX;
          window.data = null;
        },
      ),

    /** @param {string} windowKey */
    toggleWindow: (windowKey, data = null) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[windowKey];
          if (!window) {
            return;
          }
          if (window.isOpen) {
            window.isOpen = false;
            window.zIndex = INITIAL_Z_INDEX;
            window.data = null;
          } else {
            window.isOpen = true;
            window.zIndex = state.nextZIndex;
            window.data = data ?? window.data;
            state.nextZIndex++;
          }
        },
      ),
    /** @param {string} windowKey */
    focusWindow: (windowKey) =>
      set(
        /** @param {{ windows: { [x: string]: any; }; nextZIndex: number; }} state */
        (state) => {
          const window = state.windows[windowKey];
          if (!window) {
            return;
          }
          window.isOpen = true;
          window.zIndex = state.nextZIndex++;
        },
      ),
  })),
);

export default useWindowStore;
