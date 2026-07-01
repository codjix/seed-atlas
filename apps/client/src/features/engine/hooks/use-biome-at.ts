import { type CommonContext, commonContextSchema } from "@repo/shared/validation";
import { useQuery } from "@tanstack/react-query";
import { useEngine } from "../ui/engine-provider";

export function useBiomeAt(payload: CommonContext) {
  const engine = useEngine();

  return useQuery({
    queryKey: ["biome-at", payload],
    enabled: engine.status !== "loading",
    queryFn: async () => {
      if (engine.status === "error") throw new Error(engine.error.message);
      if (engine.status === "ready") {
        const { success, data, error } = commonContextSchema.safeParse(payload);
        if (!success) throw new Error(error.message);
        return await engine.engine.getBiomeAt(data);
      }
    },
  });
}
