import { STRUCTURES } from "@repo/shared/constants";
import { useAtom } from "jotai/react";
import { useEffect, useMemo } from "react";
import * as store from "../store";
import { useMapControls } from "./use-map-controls";

export const useStructureSearch = () => {
  const controls = useMapControls();
  const [targetId, setTargetId] = useAtom(store.structureIdAtom);
  const [radius, setRadius] = useAtom(store.structureRadiusAtom);
  const [limit, setLimit] = useAtom(store.structureLimitAtom);
  const [page, setPage] = useAtom(store.structurePageAtom);
  const structures = useMemo(
    () =>
      STRUCTURES.filter(({ dimension }) => dimension === controls.dimension).map(
        ({ id, label }) => ({ value: id.toString(), label }),
      ),
    [controls.dimension],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset page
  useEffect(() => setPage(1), [targetId, radius, limit]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: auto choose value
  useEffect(() => setTargetId(Number(structures[0].value)), [controls.dimension]);

  return {
    ...{ targetId, setTargetId },
    ...{ radius, setRadius },
    ...{ limit, setLimit },
    ...{ page, setPage },
    structures,
    values: {
      ...controls.values,
      targetType: "structure" as const,
      targetId,
      radius,
      limit,
      page,
    },
  };
};
