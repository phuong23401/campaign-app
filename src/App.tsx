import { useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./components/CustomTabPanel";
import InformationForm from "./pages/InformationForm";

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ margin: 5 }} textAlign={"center"}>
        CREATE CAMPAIGN APP
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Information" />
          <Tab label="Sub Campaign" />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <InformationForm />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        Item Two
      </CustomTabPanel>
    </Container>
  );
}

export default App;
