import { Delete } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useInstantSearch } from "react-instantsearch";

const QueryDetails = () => {
  const router = useRouter();
  const { results } = useInstantSearch();
  const { query } = router.query;
  const totalHits = results?.nbHits;

  if (!query) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "13px 0",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Box
        sx={{
          padding: "0 19px",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            lineHeight: "23px",
            fontWeight: 700,
            textDecoration: "underline",
            color: "black",
          }}
        >
          Búsqueda
        </Typography>
      </Box>
      <Divider
        sx={(theme) => ({
          borderColor: theme.palette.grey[200],
          marginTop: "15px",
          marginBottom: "15px",
        })}
      />
      <Stack
        direction="row"
        sx={{
          padding: "0 19px",
          alignItems: "center",
        }}
        spacing={1}
      >
        <Box
          key="line"
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            width: "10px",
            flexGrow: 1,
            alignSelf: "stretch",
          })}
        />
        <Stack>
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.grey[400],
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "normal",
            })}
          >
            Resultados de búsqueda para:
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "black",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            {query}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={(theme) => ({
              color: theme.palette.grey[400],
              fontSize: 12,
              lineHeight: "normal",
            })}
          >
            {totalHits ? `(Resultados: ${totalHits})` : "Cargando..."}
          </Typography>
        </Stack>
        <IconButton
          color="error"
          onClick={() => {
            const newQuery = { ...router.query };
            delete newQuery["query"];
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
          <Delete />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default QueryDetails;
