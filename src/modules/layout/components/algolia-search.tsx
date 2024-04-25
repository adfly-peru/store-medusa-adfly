import React, { useState, useEffect, forwardRef } from "react";
import { Avatar, Group, Select, Text } from "@mantine/core";
import { searchClient } from "@lib/algolia-client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import * as amplitude from "@amplitude/analytics-browser";

const index = searchClient.initIndex("adfly_store");

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  hit: any;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, hit, ...others }: ItemProps, ref) => {
    const renderHighlightedText = (attribute: string) => {
      const highlightedValue = hit._highlightResult[attribute].value.replace(
        /<em>/g,
        '<em class="algolia-highlight">'
      );

      return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    if (!hit)
      return (
        <div ref={ref} {...others}>
          <Text>{label}</Text>
        </div>
      );

    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar size="xl" src={hit.image_url} />
          <div>
            <Text size="sm">{renderHighlightedText("product_name")}</Text>
            {renderHighlightedText("department_name")} -
            {renderHighlightedText("category_name")} -
            {renderHighlightedText("subcategory_name")} -
            {renderHighlightedText("commercial_name")}
          </div>
        </Group>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  const searchProduct = (value: string) => {
    if (value === query) {
      amplitude.track("Search Product", {
        data: value,
        origin: "Search Bar",
      });
      router.push({
        pathname: "/search",
        query: { query },
      });
    } else {
      amplitude.track("Go to Product from search bar", {
        productid: value,
      });
      router.push({
        pathname: "/product/" + value,
      });
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      index
        .search(query, {
          hitsPerPage: 10,
          filters: 'product_status:"accepted"',
        })
        .then(({ hits }) => {
          setItems([
            {
              value: query,
              label: `Buscar otros productos con "${query}"`,
              hit: null,
            },
            ...hits.map((hit: any) => ({
              value: hit.product_id,
              label: query,
              hit: hit,
            })),
          ]);
        })
        .catch((err) => {
          console.log(err);
          setItems([]);
        });
    } else {
      setItems([]);
    }
  }, [query]);

  return (
    <Select
      placeholder="Buscar Productos"
      searchable
      searchValue={query}
      onSearchChange={setQuery}
      data={items}
      value={null}
      nothingFound="No se encontraron productos"
      onChange={searchProduct}
      itemComponent={SelectItem}
      icon={<IconSearch size={16} stroke={1.5} />}
    />
  );
};

export default SearchComponent;
