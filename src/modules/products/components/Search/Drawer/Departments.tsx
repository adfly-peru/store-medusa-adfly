import { Icon } from "@iconify/react";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRefinementList } from "react-instantsearch";

const CategorySection = ({
  attribute,
  backLabel,
  prevAttribute,
}: {
  attribute?: string;
  backLabel: string;
  prevAttribute?: string;
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const { items } = useRefinementList({
    attribute: attribute || "unused_attribute",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <List
      sx={{ width: "100%" }}
      subheader={
        prevAttribute ? (
          <ListItemButton
            sx={{
              marginLeft: "10px",
              backgroundColor: "inherit",
            }}
            onClick={() => {
              const newQuery = { ...router.query };
              delete newQuery[prevAttribute];
              router.push(
                {
                  pathname: "/search",
                  query: newQuery,
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            <ListItemIcon
              sx={{
                marginRight: 1,
              }}
            >
              <ArrowBack />
            </ListItemIcon>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                textDecoration: "underline",
                color: "black",
              }}
            >
              {backLabel}
            </Typography>
          </ListItemButton>
        ) : (
          <ListSubheader
            sx={{
              marginLeft: "10px",
              backgroundColor: "inherit",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "underline",
              color: "black",
            }}
          >
            {backLabel}
          </ListSubheader>
        )
      }
    >
      <Collapse in={expanded} collapsedSize={180}>
        {attribute &&
          items.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{
                padding: "5px 25px",
              }}
              onClick={() => {
                const newQuery = { ...router.query };
                newQuery[attribute] = item.label;
                router.push(
                  {
                    pathname: "/search",
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            >
              <Typography variant="caption">{item.label}</Typography>
            </ListItemButton>
          ))}
      </Collapse>

      <Divider
        sx={(theme) => ({
          fontWeight: 600,
          fontSize: 16,
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "5px 20px",
        })}
      />
      {items.length > 5 && (
        <Button
          size="small"
          variant="contained"
          sx={(theme) => ({
            width: 280,
            margin: "20px 20px 0px 20px",
            [theme.breakpoints.down("lg")]: {
              width: 220,
            },
          })}
          onClick={handleExpandClick}
        >
          {expanded ? "Ver menos" : "Ver todo"}
          <Icon
            icon={expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            height={20}
          />
        </Button>
      )}
    </List>
  );
};

const Departments = () => {
  const router = useRouter();
  const { department_name, category_name, subcategory_name } = router.query;

  return (
    <div>
      {subcategory_name ? (
        <CategorySection
          backLabel={subcategory_name as string}
          prevAttribute="subcategory_name"
        />
      ) : category_name ? (
        <CategorySection
          attribute="subcategory_name"
          backLabel={category_name as string}
          prevAttribute="category_name"
        />
      ) : department_name ? (
        <CategorySection
          attribute="category_name"
          backLabel={department_name as string}
          prevAttribute="department_name"
        />
      ) : (
        <CategorySection attribute="department_name" backLabel={"Tienda"} />
      )}
    </div>
  );
};

export default Departments;
