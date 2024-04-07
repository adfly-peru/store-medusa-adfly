import React, { useState } from "react";
import {
  InstantSearch,
  Hits,
  connectStateResults,
  connectSearchBox,
  Highlight,
} from "react-instantsearch-dom";
import {
  TextInput,
  Menu,
  Divider,
  Text,
  UnstyledButton,
  Group,
  Avatar,
} from "@mantine/core";
import { searchClient } from "@lib/algolia-client";
import { IconSearch } from "@tabler/icons-react";

const Hit = ({ hit }: { hit: any }) => (
  <Menu.Item>
    <Group noWrap>
      <Avatar size="xl" src={hit.image_url} />
      <div>
        <Text size="sm">
          <Highlight attribute="product_name" hit={hit} tagName="mark" />
        </Text>
        <Text size="xs" opacity={0.65}>
          <Highlight attribute="product_description" hit={hit} tagName="mark" />
        </Text>
        <Highlight attribute="department_name" hit={hit} tagName="mark" />
        {" - "}
        <Highlight attribute="category_name" hit={hit} tagName="mark" />
        {" - "}
        <Highlight attribute="subcategory_name" hit={hit} tagName="mark" />
        {" - "}
        <Highlight attribute="commercial_name" hit={hit} tagName="mark" />
      </div>
    </Group>
  </Menu.Item>
);

const Results = connectStateResults(({ searchState, searchResults }: any) =>
  searchState.query && searchResults && searchResults.nbHits !== 0 ? (
    <Menu.Dropdown>
      <Menu.Label>
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            alert(`Buscar otros resultados para "${searchState.query}"`)
          }
        >
          Buscar otros resultados para {`"${searchState.query}"`}
        </div>
      </Menu.Label>
      <Divider />
      <Hits hitComponent={Hit} />
    </Menu.Dropdown>
  ) : null
);

const CustomSearchBox = connectSearchBox(
  ({ refine, currentRefinement }: any) => (
    <TextInput
      placeholder="Buscar productos..."
      value={currentRefinement}
      onChange={(event) => {
        refine(event.currentTarget.value);
      }}
      icon={<IconSearch size={16} stroke={1.5} />}
    />
  )
);

const SearchComponent = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="adfly_store">
      <Menu opened width="50%" offset={0}>
        <Menu.Target>
          <UnstyledButton w="100%">
            <CustomSearchBox />{" "}
          </UnstyledButton>
        </Menu.Target>

        <Results />
      </Menu>
    </InstantSearch>
  );
};

export default SearchComponent;
