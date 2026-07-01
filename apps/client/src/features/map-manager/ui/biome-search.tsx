import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  CopyButton,
  Divider,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { BIOMES } from "@repo/shared/constants";
import { Iconify } from "@/components/iconify";
import { Paginator } from "@/components/paginator";
import { useSearchTargets } from "@/features/engine";
import { formatTime } from "@/utils/format-time";
import { useBiomeSearch } from "../hooks";

export const BiomeSearch = () => {
  const state = useBiomeSearch();
  const { data, mutate, error, isPending } = useSearchTargets(state.values);

  const totalPages = data ? Math.ceil(data.meta.total / data.meta.limit) : 0;

  return (
    <Stack mt={10} gap="sm">
      <Select
        label="Select Biome"
        data={state.biomes}
        onChange={(value) => state.setTargetId(Number(value))}
        nothingFoundMessage="No biome found, Overworld biomes only"
        value={state.targetId.toString()}
        searchable
      />
      <Group gap="sm">
        <NumberInput
          label="Radius"
          onChange={(value) => state.setRadius(Number(value))}
          value={state.radius.toString()}
          flex={1}
        />
        <Select
          label="Limit"
          onChange={(value) => state.setLimit(Number(value))}
          data={["5", "10", "20", "50", "100"]}
          value={state.limit.toString()}
          w={95}
        />
      </Group>
      {error && (
        <Alert color="red" title="Error">
          {error.message}
        </Alert>
      )}
      <Button onClick={() => mutate()} loading={isPending}>
        Search
      </Button>
      <Divider />
      {!data || data.meta.total === 0 ? (
        <Stack component={Card} gap={10} py={50} justify="center" align="center" ta="center">
          <ThemeIcon size={80} variant="light">
            <Iconify width={50} icon="solar:info-square-bold" />
          </ThemeIcon>
          <Text fw="bold">No results found</Text>
          <Text fz="sm" c="dimmed">
            Please try again or check view level, Overworld biomes only.
          </Text>
        </Stack>
      ) : (
        <>
          <Group justify="space-between">
            <Text>Results</Text>
            <Text>
              {data.meta.total} found in {formatTime(data.meta.searchTime)}
            </Text>
          </Group>
          {data.results.map((result) => (
            <Stack component={Card} key={`${result.coord.x}-${result.coord.z}`}>
              <Group justify="space-between">
                <Text fw="bold">{BIOMES.find((b) => b.id === result.targetId)?.label}</Text>
                <ActionIcon.Group>
                  <CopyButton value={`/tp @s ${result.coord.x} ~ ${result.coord.z}`}>
                    {({ copied, copy }) => (
                      <ActionIcon
                        variant={copied ? "light" : "default"}
                        title="Copy teleport command"
                        onClick={copy}
                      >
                        <Iconify icon={copied ? "solar:check-square-bold" : "solar:copy-bold"} />
                      </ActionIcon>
                    )}
                  </CopyButton>
                  {/* view.x, view.z and controls.dimention */}
                  <ActionIcon title="Locate on map">
                    <Iconify icon="solar:gps-bold" />
                  </ActionIcon>
                </ActionIcon.Group>
              </Group>
              <Group align="flex-start">
                <ThemeIcon variant="light" size="xl">
                  <Iconify icon="solar:streets-map-point-bold" />
                </ThemeIcon>
                <Stack gap="xs">
                  <Text>Distance: {result.distance} blocks</Text>
                  <Group gap="xs">
                    <Badge variant="outline" size="lg" radius="sm">
                      X: {result.coord.x}
                    </Badge>
                    <Badge variant="outline" size="lg" radius="sm">
                      Z: {result.coord.z}
                    </Badge>
                  </Group>
                </Stack>
              </Group>
            </Stack>
          ))}
          <Paginator
            total={totalPages}
            value={state.page}
            onChange={(page) => {
              state.setPage(page);
              mutate();
            }}
          />
        </>
      )}
    </Stack>
  );
};
