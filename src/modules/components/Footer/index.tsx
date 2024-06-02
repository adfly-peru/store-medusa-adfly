import { Box, Stack } from "@mui/material";
import FirstPart from "./FirstPart";
import FourthPart from "./FourthPart";
import SecondPart from "./SecondPart";
import ThirdPart from "./ThirdPart";

const AppFooter = () => {
  return (
    <footer>
      <Box
        sx={(theme) => ({
          width: "100%",
          backgroundColor: theme.palette.primary.main,
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "60px",
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            backgroundColor: "white",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            padding: "20px",
            maxWidth: 1180,
            [theme.breakpoints.down(1261)]: {
              maxWidth: 1080,
            },
            [theme.breakpoints.up(1025)]: {
              maxWidth: 948,
            },
            [theme.breakpoints.up(949)]: {
              maxWidth: 756,
            },
          })}
        >
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <FirstPart />
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down(580)]: {
                  display: "none",
                },
              })}
            >
              <SecondPart />
            </Box>
            <ThirdPart />
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down(580)]: {
                  display: "none",
                },
              })}
            >
              <FourthPart />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={(theme) => ({
              justifyContent: "flex-end",
              [theme.breakpoints.down(580)]: {
                marginTop: "20px",
                justifyContent: "space-between",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                display: "none",
                [theme.breakpoints.down(580)]: {
                  display: "block",
                },
              })}
            >
              <SecondPart />
            </Box>
            <Box
              sx={(theme) => ({
                display: "none",
                [theme.breakpoints.down(580)]: {
                  display: "block",
                },
              })}
            >
              <FourthPart />
            </Box>
          </Stack>
        </Box>
      </Box>
    </footer>
  );
};

export default AppFooter;
