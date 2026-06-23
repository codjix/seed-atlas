import { Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useBiomeAt } from "@/features/engine";

const LOOKUP = {
  seed: "-410552751819709174",
  versionId: 26,
  dimension: 0, // overworld
  x: 0,
  y: 256, // surface
  z: 0,
};

export const Route = createFileRoute("/")({
  component: () => {
    const biomeId = useBiomeAt(LOOKUP);

    return (
      <Stack p="xl" gap="sm">
        <Title order={1}>Voxelen</Title>
        <Text c="dimmed">seed {LOOKUP.seed}</Text>
        <Text>
          Biome at ({LOOKUP.x}, {LOOKUP.y}, {LOOKUP.z}) is #{biomeId ?? "unknown"}
        </Text>
      </Stack>
    );
  },
});
