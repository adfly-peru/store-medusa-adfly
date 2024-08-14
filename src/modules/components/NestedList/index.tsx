import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface IRoute {
  name: string;
  path: string;
  subRoutes?: IRoute[];
}

interface IconRectangleProps {
  active: boolean;
}

const IconRectangle = styled("div")<IconRectangleProps>(
  ({ theme, active }) => ({
    width: 8,
    height: 24,
    borderRadius: "2px",
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.grey[200],
  })
);

export default function NestedList({ routes }: { routes: IRoute[] }) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const theme = useTheme();
  const router = useRouter();

  const handleClick = (route: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [route]: !prevOpen[route],
    }));
  };
  const isRouteActive = (path: string) => router.pathname.includes(path);

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {routes.map((route) => (
        <React.Fragment key={route.name}>
          <ListItemButton
            sx={{
              padding: "10px 5px",
            }}
            onClick={() =>
              route.subRoutes
                ? handleClick(route.name)
                : router.push(route.path)
            }
            selected={router.pathname === route.path}
          >
            <ListItemIcon>
              <IconRectangle active={isRouteActive(route.path)} />
            </ListItemIcon>
            <ListItemText
              primary={route.name}
              sx={{
                marginLeft: "6px",
                color:
                  router.pathname === route.path
                    ? theme.palette.primary.main
                    : "inherit",
              }}
            />
            {route.subRoutes ? (
              open[route.name] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
          {route.subRoutes && (
            <Collapse in={open[route.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {route.subRoutes.map((subRoute) => (
                  <ListItemButton
                    key={subRoute.name}
                    sx={{ pl: 4 }}
                    selected={router.pathname === subRoute.path}
                    onClick={() => router.push(subRoute.path)}
                  >
                    <ListItemText
                      primary={subRoute.name}
                      sx={{
                        color:
                          router.pathname === subRoute.path
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
