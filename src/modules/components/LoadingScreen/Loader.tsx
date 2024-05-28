import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Spinner = styled("div")(({ theme }) => ({
  width: "400px",
  height: "400px",
  border: "20px solid #fff",
  borderTop: `20px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  position: "relative",
  transform: "rotate(45deg)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-400px",
    left: "400px",
    width: "400px",
    height: "400px",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(45deg)",
    },
    "100%": {
      transform: "rotate(405deg)",
    },
  },
  [theme.breakpoints.down("lg")]: {
    width: "300px",
    height: "300px",
    border: "15px solid #fff",
    borderTop: `15px solid ${theme.palette.primary.main}`,
    "&::before": {
      top: "-300px",
      left: "300px",
      width: "300px",
      height: "300px",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "160px",
    border: "10px solid #fff",
    borderTop: `10px solid ${theme.palette.primary.main}`,
    "&::before": {
      top: "-160px",
      left: "160px",
      width: "160px",
      height: "160px",
    },
  },
}));

const Logo = styled(Image)(({ theme }) => ({
  width: "auto",
  [theme.breakpoints.down("lg")]: {
    width: "119px",
  },
  [theme.breakpoints.down("md")]: {
    width: "70px",
  },
}));

const Loader = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              width: "400px",
              height: "400px",
              [theme.breakpoints.down("lg")]: {
                width: "300px",
                height: "300px",
              },
              [theme.breakpoints.down("md")]: {
                width: "160px",
                height: "160px",
              },
            })}
          >
            <Spinner />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Logo
                sizes="100vw"
                src={"/Logo Adfly.svg"}
                alt={"Adfly"}
                width={100}
                height={46}
              />
            </Box>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
