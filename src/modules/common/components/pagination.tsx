import { ActionIcon, UnstyledButton, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    let pages = [];

    // Always include the first page
    pages.push(
      <UnstyledButton
        c={currentPage === 1 ? "dark" : "#3D7FB2"}
        fw={currentPage === 1 ? 700 : undefined}
        key={1}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        1
      </UnstyledButton>
    );

    // Include dots if the current page is greater than 3
    if (currentPage > 3) {
      pages.push(<span key="dots-before">...</span>);
    }

    // Include the previous page if currentPage is greater than 2
    if (currentPage > 2) {
      pages.push(
        <UnstyledButton
          c={"#3D7FB2"}
          key={currentPage - 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </UnstyledButton>
      );
    }

    // Include the current page if it's not the first or last
    if (currentPage > 1 && currentPage < totalPages) {
      pages.push(
        <UnstyledButton
          c="dark"
          fw={700}
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          disabled={true}
        >
          {currentPage}
        </UnstyledButton>
      );
    }

    // Include the next page if currentPage is less than totalPages - 1
    if (currentPage < totalPages - 1) {
      pages.push(
        <UnstyledButton
          c={"#3D7FB2"}
          key={currentPage + 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </UnstyledButton>
      );
    }

    // Include dots if the current page is less than totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push(<span key="dots-after">...</span>);
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(
        <UnstyledButton
          c={currentPage === totalPages ? "dark" : "#3D7FB2"}
          fw={currentPage === totalPages ? 700 : undefined}
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </UnstyledButton>
      );
    }

    return pages;
  };

  return (
    <Group>
      <ActionIcon
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </ActionIcon>
      {renderPages()}
      <ActionIcon
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconChevronRight />
      </ActionIcon>
    </Group>
  );
};

export default Pagination;
