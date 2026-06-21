mkdir -p dist

emcc \
  cubiomes/noise.c cubiomes/biomes.c cubiomes/layers.c cubiomes/biomenoise.c \
  cubiomes/generator.c cubiomes/util.c cubiomes/quadbase.c \
  src/native/engine.c -Icubiomes -Isrc/native -O3 -fwrapv \
  -s MODULARIZE=1 -s EXPORT_NAME=createWasmModule -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1 -s ENVIRONMENT=web,worker -s WASM_ASYNC_COMPILATION=1 \
  -s EXPORTED_FUNCTIONS='["_get_biome_at"]' \
  -s EXPORTED_RUNTIME_METHODS='["cwrap"]' \
  -o dist/engine.js

echo "WASM module built successfully"