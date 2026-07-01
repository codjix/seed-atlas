import { MAP_CONTROLS, SEARCH } from "@repo/shared/constants";
import { atomWithStorage } from "jotai/utils";

// Controls
export const seedAtom = atomWithStorage("map-seed", MAP_CONTROLS.seed);
export const versionIdAtom = atomWithStorage("map-version", MAP_CONTROLS.versionId);
export const dimensionAtom = atomWithStorage("map-dimension", MAP_CONTROLS.dimension);
export const isLargeBiomeAtom = atomWithStorage("map-is-large-biome", MAP_CONTROLS.isLargeBiome);
export const coordinatesAtom = atomWithStorage("map-coordinates", MAP_CONTROLS.coordinates);
export const biomeHeightAtom = atomWithStorage("map-biome-height", MAP_CONTROLS.biomeHeight);
export const structuresAtom = atomWithStorage<number[]>("map-structures", MAP_CONTROLS.structures);
export const biomesAtom = atomWithStorage<number[]>("map-biomes", MAP_CONTROLS.biomes);

// Biome Search
export const biomeIdAtom = atomWithStorage("biome-id", SEARCH.biomeId);
export const biomeRadiusAtom = atomWithStorage("biome-radius", SEARCH.radius);
export const biomeLimitAtom = atomWithStorage("biome-limit", SEARCH.limit);
export const biomePageAtom = atomWithStorage("biome-page", SEARCH.page);

// Structure Search
export const structureIdAtom = atomWithStorage("structure-id", SEARCH.structureId);
export const structureRadiusAtom = atomWithStorage("structure-radius", SEARCH.radius);
export const structureLimitAtom = atomWithStorage("structure-limit", SEARCH.limit);
export const structurePageAtom = atomWithStorage("structure-page", SEARCH.page);
