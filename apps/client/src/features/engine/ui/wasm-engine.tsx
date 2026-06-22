import { createWasmEngine, type WasmEngine } from "@repo/engine-wasm";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type WasmEngineState =
  | { status: "loading" }
  | { status: "ready"; engine: WasmEngine }
  | { status: "error"; error: Error };

const WasmEngineCtx = createContext<WasmEngineState | null>(null);

export function useWasmEngine() {
  const ctx = useContext(WasmEngineCtx);
  if (!ctx) throw new Error("useWasmEngine must be used within WasmEngineProvider");
  return ctx;
}

export function WasmEngineProvider({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<WasmEngineState>({ status: "loading" });

  useEffect(() => {
    createWasmEngine()
      .then((engine) => setState({ status: "ready", engine }))
      .catch((error) => setState({ status: "error", error }));
  }, []);

  return <WasmEngineCtx value={state}>{children}</WasmEngineCtx>;
}
