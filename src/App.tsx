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

  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

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
    setFormData({
      ...formData,
      subCampaigns: subCampaignDataList,
    });
  };

  const validateFormData = () => {
    let hasError = false;
    if (formData.information.name.trim() === "") {
      hasError = true;
    }

    for (const subCampaign of formData.subCampaigns) {
      if (subCampaign.name.trim() === "") {
        hasError = true;
      }

      for (const advertisement of subCampaign.ads) {
        if (advertisement.name.trim() === "" || advertisement.quantity === 0) {
          hasError = true;
        }
      }
    }

    setIsError(hasError);
  };

  const onSubmit = () => {
    validateFormData();
    setIsOpen(true);
  };

  const onClosePopup = () => {
    setIsOpen(false);
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
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            width: "fit-content",
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 3,
            borderRadius: 2,
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            backgroundColor: "#2a2a2a",
            color: "#fff",
            zIndex: 99,
          }}
        >
          {isError ? (
            <Typography variant="h6">
              Please fill in the correct and complete information.
            </Typography>
          ) : (
            <>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Submit Successfully!
              </Typography>
              <Typography>{JSON.stringify(formData)}</Typography>
            </>
          )}
          <Button
            variant="contained"
            onClick={onClosePopup}
            sx={{ marginTop: 3 }}
          >
            Okay
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
