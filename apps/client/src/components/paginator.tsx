import { Button, Card, Center, Group, NumberInput, Pagination, Popover } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { Activity, useState } from "react";

export type $Paginator = UseUncontrolledOptions<number> & {
  total: number;
};

export const Paginator = ({ total, ...props }: $Paginator) => {
  const [page, setPage] = useUncontrolled(props);

  return (
    <Activity mode={total > 1 ? "visible" : "hidden"}>
      <Center>
        <Pagination.Root value={page} onChange={setPage} total={total} size={36}>
          <Group wrap="nowrap" gap={15}>
            <Pagination.Previous title="Previous Page" />
            <MiniPaginator total={total} {...props} />
            <Pagination.Next title="Next Page" />
          </Group>
        </Pagination.Root>
      </Center>
    </Activity>
  );
};

const MiniPaginator = ({ total, ...props }: $Paginator) => {
  const [page, setPage] = useUncontrolled(props);
  const [cache, setCache] = useState(page);

  const handleNavigate = () => {
    if (cache < 1 || cache > total) return;
    setPage(cache);
  };

  return (
    <Popover width={225} position="top" withArrow>
      <Popover.Target>
        <Card py={6} h={36} style={{ cursor: "pointer" }} title={`Page ${page} of ${total}`}>
          {page} of {total}
        </Card>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="flex-end">
          <NumberInput
            label="Go to page"
            onChange={(value) => setCache(Number(value ?? 1))}
            value={cache}
            max={total}
            flex={1}
            min={1}
          />
          <Button onClick={handleNavigate} variant="filled">
            Go
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
