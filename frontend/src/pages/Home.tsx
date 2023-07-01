import { Box, Container } from "@mui/material";
import Hello from "../assets/svg/Hello";
import withAdmin from "../routes/withAdmin";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <Hello />
      </Box>
    </Container>
  );
};

export default withAdmin(Home);
