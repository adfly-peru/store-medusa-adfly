import { Group, ActionIcon, UnstyledButton } from "@mantine/core";
import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import { usePagination } from "react-instantsearch";

const CustomPagination = () => {
  const { pages, refine, isFirstPage, isLastPage, currentRefinement, nbPages } =
    usePagination({
      padding: 1,
    });

  return (
    <Group>
      <ActionIcon disabled={isFirstPage} onClick={() => refine(0)}>
        <IconChevronsLeft />
      </ActionIcon>
      <ActionIcon
        disabled={isFirstPage}
        onClick={() => refine(currentRefinement - 1)}
      >
        <IconChevronLeft />
      </ActionIcon>
      {pages.map((p) => (
        <UnstyledButton
          c={currentRefinement === p ? "dark" : "#3D7FB2"}
          key={p}
          onClick={() => refine(p)}
          disabled={currentRefinement === p}
          fw={currentRefinement === p ? 700 : 500}
        >
          {p + 1}
        </UnstyledButton>
      ))}
      <ActionIcon
        disabled={isLastPage}
        onClick={() => refine(currentRefinement + 1)}
      >
        <IconChevronRight />
      </ActionIcon>
      <ActionIcon disabled={isLastPage} onClick={() => refine(nbPages - 1)}>
        <IconChevronsRight />
      </ActionIcon>
    </Group>
  );
};

export default CustomPagination;
