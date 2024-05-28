import { Paper, Stack, Typography } from "@mui/material";
import { Suborder } from "generated/graphql";
import SuborderInformation from "./Suborder";

const SubordersSection = ({ suborders }: { suborders: Suborder[] }) => {
  return (
    <Stack>
      <Typography variant="h2" color="black">
        Envíos
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Stack spacing={2}>
          {suborders.map((suborder, index) => (
            <SuborderInformation
              suborder={suborder}
              key={index}
              index={index}
              total={suborders.length}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default SubordersSection;
