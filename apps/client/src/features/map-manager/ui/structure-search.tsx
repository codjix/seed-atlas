import {
  Alert,
  Button,
  Card,
  Divider,
  Group,
  NumberInput,
  Pagination,
  Select,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Iconify } from "@/components/iconify";
import { useSearchTargets } from "@/features/engine";
import { formatTime } from "@/utils/format-time";
import { useStructureSearch } from "../hooks";

export const StructureSearch = () => {
  const state = useStructureSearch();
  const { data, mutate, error, isPending } = useSearchTargets(state.values);

  const total = Math.ceil((data?.meta.total ?? 1) / state.limit);

  return (
    <Stack mt={10} gap="sm">
      <Select
        label="Select Structure"
        data={state.structures}
        onChange={(value) => state.setTargetId(Number(value))}
        nothingFoundMessage="No structure found"
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
            Please try again with different parameters
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
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </Stack>
          ))}
          <center>
            <Pagination
              w="fit-content"
              hidden={total <= 1}
              total={total}
              value={state.page}
              siblings={0}
              onChange={(page) => {
                state.setPage(page);
                mutate();
              }}
            />
          </center>
        </>
      )}
    </Stack>
  );
};
