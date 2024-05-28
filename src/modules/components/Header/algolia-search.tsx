import React, { useState, useEffect, forwardRef } from "react";
import { searchClient } from "@lib/algolia-client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import * as amplitude from "@amplitude/analytics-browser";
import {
  Autocomplete,
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const index = searchClient.initIndex("adfly_store");

interface ItemProps {
  hit: any;
  label: string;
  searchFunc: () => void;
}

const SelectItem = forwardRef<HTMLLIElement, ItemProps>(
  ({ hit, label, searchFunc }, ref) => {
    const renderHighlightedText = (attribute: string) => {
      const highlightedValue = hit._highlightResult[attribute].value.replace(
        /<em>/g,
        '<em class="algolia-highlight">'
      );

      return (
        <Typography
          variant="inherit"
          display="inline"
          dangerouslySetInnerHTML={{ __html: highlightedValue }}
        />
      );
    };

    if (!hit)
      return (
        <Box
          ref={ref}
          sx={(theme) => ({
            padding: "10px 15px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[200],
            },
          })}
          onClick={() => searchFunc()}
        >
          <Typography variant="body2">{label}</Typography>
        </Box>
      );

    return (
      <Box
        ref={ref}
        sx={(theme) => ({
          padding: "10px 15px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        })}
        onClick={() => searchFunc()}
      >
        <Stack direction="row" spacing={1}>
          <Avatar src={hit.image_url} />
          <div>
            <Typography variant="h5" fontWeight={700}>
              {renderHighlightedText("product_name")}
            </Typography>
            <Typography variant="subtitle2">
              {renderHighlightedText("department_name")}
              {" > "}
              {renderHighlightedText("category_name")}
              {" > "}
              {renderHighlightedText("subcategory_name")}
              {" > "}
              {renderHighlightedText("commercial_name")}
            </Typography>
          </div>
        </Stack>
      </Box>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SearchComponent = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  const searchProduct = (value: string) => {
    if (value === query) {
      amplitude.track("Search Product", {
        data: value,
        origin: "Search Bar",
      });
      router.push({
        pathname: "/search",
        query: { query, type: "product" },
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
          console.error(err);
          setItems([]);
        });
    } else {
      setItems([]);
    }
  }, [query]);

  return (
    <Autocomplete
      sx={{
        width: "100%",
      }}
      freeSolo
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      options={items}
      getOptionLabel={(option) => option?.label ?? option}
      renderOption={(props, option) => (
        <SelectItem
          {...props}
          label={option.label}
          hit={option.hit}
          key={option.hit?.objectID ?? "default-key"}
          searchFunc={() => searchProduct(option.value)}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Buscar en Adfly"
          InputProps={{
            ...params.InputProps,
            startAdornment: <Search />,
            sx: {
              backgroundColor: "white",
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchProduct(query);
            }
          }}
        />
      )}
      inputValue={query}
      onInputChange={(_, newInputValue) => {
        if (newInputValue !== "undefined") setQuery(newInputValue);
      }}
    />
  );
};

export default SearchComponent;
