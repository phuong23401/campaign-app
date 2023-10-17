import { useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./components/CustomTabPanel";
import InformationForm from "./pages/InformationForm";
import SubCampaignForm from "./pages/SubCampaignForm";
import { Campaign, SubCampaign, Information } from "./types/Campaign";

function App() {
  const defaultData = {
    information: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        id: 0,
        name: "",
        status: false,
        ads: [
          {
            id: 0,
            name: "",
            quantity: 0,
          },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState<Campaign>(defaultData);
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleInformationChange = (informationData: Information) => {
    setFormData((prevData) => ({
      ...prevData,
      information: informationData,
    }));
  };

  const handleSubCampaignChange = (subCampaignDataList: SubCampaign[]) => {
    setFormData((prevData) => ({
      ...prevData,
      subCampaigns: subCampaignDataList,
    }));
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ margin: 5 }} textAlign={"center"}>
        CREATE CAMPAIGN APP
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleChangeTab} centered>
          <Tab label="Information" />
          <Tab label="Sub Campaign" />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <InformationForm onChange={handleInformationChange} />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <SubCampaignForm onChange={handleSubCampaignChange} />
      </CustomTabPanel>
    </Container>
  );
}

export default App;
