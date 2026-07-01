import { BIOMES } from "@repo/shared/constants";
import { useAtom } from "jotai/react";
import { useEffect } from "react";
import * as store from "../store";
import { useMapControls } from "./use-map-controls";

const biomes = BIOMES.filter(({ dimension }) => dimension === 0).map(({ id, label }) => ({
  value: id.toString(),
  label,
}));

export const useBiomeSearch = () => {
  const controls = useMapControls();
  const [targetId, setTargetId] = useAtom(store.biomeIdAtom);
  const [radius, setRadius] = useAtom(store.biomeRadiusAtom);
  const [limit, setLimit] = useAtom(store.biomeLimitAtom);
  const [page, setPage] = useAtom(store.biomePageAtom);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset page
  useEffect(() => setPage(1), [targetId, radius, limit]);

  return {
    ...{ targetId, setTargetId },
    ...{ radius, setRadius },
    ...{ limit, setLimit },
    ...{ page, setPage },
    biomes,
    values: {
      ...controls.values,
      targetType: "biome" as const,
      targetId,
      radius,
      limit,
      page,
    },
  };
};
