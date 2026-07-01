import { type SearchRequest, searchRequestSchema } from "@repo/shared/validation";
import { useMutation } from "@tanstack/react-query";
import { useEngine } from "../ui/engine-provider";

export function useSearchTargets(payload: SearchRequest) {
  const engine = useEngine();

  return useMutation({
    mutationFn: async () => {
      if (engine.status === "error") throw new Error(engine.error.message);
      if (engine.status === "ready") {
        const { success, data, error } = searchRequestSchema.safeParse(payload);
        if (!success) throw new Error(error.message);
        return await engine.engine.searchTargets(data);
      }
    },
  });
}
