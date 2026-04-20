import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { locations } from "#constants";

const DEFULT_LOCATION = locations.work;

/**
 * @typedef {Object} LocationItem
 * @property {number} id
 * @property {string} name
 * @property {string} icon
 * @property {string} kind
 * @property {string} [fileType]
 * @property {string} [href]
 * @property {string} [position]
 * @property {Array<LocationItem>} [children]
 */

/**
 * @typedef {Object} LocationState
 * @property {LocationItem} activeLocation
 * @property {(location: LocationItem | null) => void} setActiveLocation
 * @property {() => void} resetActiveLocation
 */

/**
 * @type {() => LocationState }
 */
const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFULT_LOCATION,
    setActiveLocation: (location = null) => {
      set(
        /** @param {LocationState} state */
        (state) => {
          state.activeLocation = location;
        },
      );
    },
    resetActiveLocation: () => {
      set(
        /** @param {LocationState} state */
        (state) => {
          state.activeLocation = DEFULT_LOCATION;
        },
      );
    },
  })),
);

export default useLocationStore;
