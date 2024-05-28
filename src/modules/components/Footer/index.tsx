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
          paddingLeft: "60px",
          paddingRight: "60px",
          paddingBottom: "60px",
          [theme.breakpoints.down("lg")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingBottom: "30px",
          },
          [theme.breakpoints.up("md")]: {
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            backgroundColor: "white",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            padding: "40px",
          })}
        >
          <Stack direction="row" justifyContent="space-between">
            <FirstPart />
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              <SecondPart />
            </Box>
            <ThirdPart />
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down("lg")]: {
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
              [theme.breakpoints.down("md")]: {
                marginTop: "20px",
                justifyContent: "space-between",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
            >
              <SecondPart />
            </Box>
            <Box
              sx={(theme) => ({
                [theme.breakpoints.up("lg")]: {
                  display: "none",
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
