import { createWASMEngine, type WasmEngine } from "@repo/engine-wasm";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type WasmEngineState =
  | { status: "loading" }
  | { status: "ready"; engine: WasmEngine }
  | { status: "error"; error: Error };

const WasmEngineCtx = createContext<WasmEngineState | null>(null);

export function useWasmEngine() {
  const state = useContext(WasmEngineCtx);
  if (!state) throw new Error("useWasmEngine must be used within WasmEngineProvider");
  return state;
}

export function WasmEngineProvider({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<WasmEngineState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    createWASMEngine()
      .then((engine) => (!cancelled ? setState({ status: "ready", engine }) : undefined))
      .catch((err) => {
        if (!cancelled) {
          const error = err instanceof Error ? err : new Error(String(err));
          setState({ status: "error", error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <WasmEngineCtx value={state}>{children}</WasmEngineCtx>;
}
