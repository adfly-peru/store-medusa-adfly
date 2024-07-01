import { Theme, alpha, createTheme } from "@mui/material/styles";

const baseTheme = (theme: Theme) => {
  return createTheme({
    ...theme,
    typography: {
      h1: {
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: 30,
        whiteSpace: "pre-line",
      },
      h2: {
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: 25,
        whiteSpace: "pre-line",
      },
      h3: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "150%",
        whiteSpace: "pre-line",
      },
      h4: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: "150%",
        whiteSpace: "pre-line",
      },
      h5: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: "150%",
        whiteSpace: "pre-line",
      },
      subtitle1: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: "pre-line",
      },
      subtitle2: {
        fontFamily: "Open Sans, sans-serif",
        color: theme.palette.grey[500],
        fontWeight: "normal",
        fontSize: 11,
        [theme.breakpoints.up("md")]: {
          fontSize: 13,
        },
        lineHeight: "19.4px",
        whiteSpace: "pre-line",
      },
      body1: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 13,
        lineHeight: "12px",
        whiteSpace: "pre-line",
      },
      body2: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        fontWeight: "normal",
        whiteSpace: "pre-line",
      },
      caption: {
        fontFamily: "Open Sans, sans-serif",
        color: theme.palette.grey[500],
        fontSize: 16,
        fontWeight: "normal",
        whiteSpace: "pre-line",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".algolia-highlight": {
            color: theme.palette.primary.main,
          },
          ".slick-products-slider": {
            width: "100%",
            display: "flex !important",
            gap: "20px",
            [theme.breakpoints.down(949)]: {
              gap: "8px",
            },
            ".slick-list": {
              paddingLeft: "5px",
              paddingRight: "5px",
              position: "relative",
              overflow: "hidden",
              "::before, ::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "20px",
                zIndex: 1,
              },
              "::before": {
                left: 0,
                background:
                  "linear-gradient(to left, transparent, rgba(255, 255, 255, 0.9))",
                filter: "blur(8px)",
              },
              "::after": {
                right: 0,
                background:
                  "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9))",
                filter: "blur(8px)",
              },
            },
            ".slick-track": {
              gap: "30px",
            },
            ".slick-slide": {
              width: "auto !important",
            },
          },
          ".slick-product-dots li button:before": {
            marginTop: "10px",
            fontSize: "10px !important",
          },
          ".slick-dots li": {
            height: 50,
            width: 50,
            filter: "grayscale(100%)",
          },
          ".slick-dots-products-slider li": {
            height: "50px !important",
            width: "50px !important",
            filter: "grayscale(100%)",
          },
          ".slick-dots .slick-active": {
            filter: "none",
          },
          ".pac-container": {
            zIndex: 10000000,
          },
          ".slick-arrow:hover": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
          },
          ".slick-arrow:focus": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
          },
          ".slick-track": {
            display: "flex !important",
            alignItems: "center",
          },
          ".slick-banners-arrow": {
            height: "40px",
            width: "40px",
            fontSize: "40px !important",
            [theme.breakpoints.down("md")]: {
              height: "30px",
              width: "30px",
              fontSize: "30px !important",
            },
            [theme.breakpoints.down("sm")]: {
              height: "20px",
              width: "20px",
              fontSize: "20px !important",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 22,
            alignSelf: "flex-end",
          },
          label: {
            fontFamily: "Open Sans, sans-serif",
            fontSize: 12,
            fontWeight: 600,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: 12,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "6px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontFamily: "Open Sans, sans-serif",
            fontSize: 13,
            lineHeight: "19.4px",
          },
          root: {
            borderRadius: "6px !important",
            "&.Mui-disabled": {
              backgroundColor: alpha(theme.palette.grey[400], 0.3),
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            ":hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            ":focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          asterisk: {
            color: "#ff0000",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& label": {
              fontFamily: "Open Sans, sans-serif",
              fontSize: 13,
              lineHeight: "19.4px",
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          message: {
            fontFamily: "Open Sans, sans-serif",
            fontSize: 12,
            lineHeight: "12px",
            textAlign: "justify",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
            paddingRight: 5,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.primary.main,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontWeight: 600,
            fontSize: 18,
            [theme.breakpoints.down("md")]: {
              fontSize: 16,
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: 15,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            fontSize: 28,
            color: "black",
            minWidth: "unset",
            [theme.breakpoints.down("md")]: {
              fontSize: 24,
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: 20,
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            marginTop: "10px",
            marginBottom: "10px",
            "&.active": {
              "& .MuiListItemText-primary": {
                fontWeight: 600,
                fontSize: 14,
                color: theme.palette.primary.main,
              },
              "& .MuiListItemText-secondary": {
                fontSize: 12,
              },
              "& .MuiAvatar-root": {
                backgroundColor: theme.palette.primary.main,
              },
            },
            "&.inactive": {
              "& .MuiListItemText-primary": {
                fontWeight: 600,
                fontSize: 14,
                color: theme.palette.grey[500],
              },
              "& .MuiListItemText-secondary": {
                fontSize: 12,
              },
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            "&:last-child td, &:last-child th": {
              border: 0,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: "0.0625rem solid rgb(222, 226, 230) ",
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            position: "static",
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            fontFamily: "Open Sans, sans-serif",
            color: theme.palette.grey[300],
            fontSize: 13,
            fontWeight: 600,
            "&.Mui-selected": {
              color: "black",
            },
          },
        },
      },
    },
  });
};

export default baseTheme;
