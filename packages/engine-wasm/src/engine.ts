import engineWasmUrl from "../dist/engine.wasm?url";

// ========== Load WASM module ==========
type WasmModule = {
  cwrap: (name: string, ret: string, args: string[]) => (...args: number[]) => number;
};

async function initModule() {
  const url = new URL("../dist/engine.js", import.meta.url).href;
  const { default: createModule } = (await import(/* @vite-ignore */ url)) as {
    default: (opts?: { locateFile?: (path: string) => string }) => Promise<WasmModule>;
  };

  return createModule({
    locateFile: (path) => (path.endsWith(".wasm") ? engineWasmUrl : path),
  });
}

// ========== Engine API ==========
export type GetBiomeAtInput = {
  versionId: number;
  dimension: number;
  seed: string | bigint;
  x: number;
  y: number;
  z: number;
};

export type WasmEngine = Awaited<ReturnType<typeof createWASMEngine>>;
export async function createWASMEngine() {
  return initModule().then((module) => {
    // bridge functions
    const getBiomeAtc = module.cwrap("get_biome_at", "number", Array(7).fill("number"));
    return {
      // method functions
      getBiomeAt({ versionId, dimension, seed, x, y, z }: GetBiomeAtInput) {
        const bigSeed = BigInt(seed) & ((1n << 64n) - 1n);
        const [seedHi, seedLo] = [Number(bigSeed >> 32n), Number(bigSeed & 0xffffffffn)];
        return getBiomeAtc(versionId, dimension, seedHi, seedLo, x, y, z);
      },
    };
  });
}
