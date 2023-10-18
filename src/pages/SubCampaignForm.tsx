import { useState } from "react";
import { FormControl, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AdvertisementForm from "./AdvertisementForm";
import SubCampaignBox from "../components/SubCampaignBox";
import { Advertisement, SubCampaign } from "../types/Campaign";

interface SubCampaignFormProps {
  hasError: boolean;
  onChange: (subCampaignDataList: SubCampaign[]) => void;
}

function SubCampaignForm(props: SubCampaignFormProps) {
  const { hasError, onChange } = props;
  const defaultSubCampaign = {
    id: 1,
    name: "Sub Campaign 1",
    status: true,
    ads: [{ id: 1, name: "Advertisement 1", quantity: 0 }],
  };

  const [subCampaignList, setSubCampainList] = useState<SubCampaign[]>([
    defaultSubCampaign,
  ]);
  const [currentCampaign, setCurrentCampaign] =
    useState<SubCampaign>(defaultSubCampaign);

  const [name, setName] = useState(defaultSubCampaign.name);
  const [status, setStatus] = useState(defaultSubCampaign.status);
  const [ads, setAds] = useState<Advertisement[]>(defaultSubCampaign.ads);

  const addNewSubCampaign = () => {
    let newId = subCampaignList.length + 1;
    let newName = `Sub Campaign ${newId}`;

    while (subCampaignList.some((campaign) => campaign.name === newName)) {
      newId++;
      newName = `Sub Campaign ${newId}`;
    }

    const newSubCampaign = {
      id: newId,
      name: newName,
      status: true,
      ads: [{ id: 1, name: "Advertisement 1", quantity: 0 }],
    };
    const newList = [...subCampaignList, newSubCampaign];

    onChange(newList);
    setSubCampainList(newList);
    setCurrentCampaign(newSubCampaign);

    setName(newSubCampaign.name);
    setStatus(newSubCampaign.status);
    setAds(newSubCampaign.ads);
  };

  const setInfo = (subCampaign: SubCampaign) => {
    if (subCampaign) {
      setCurrentCampaign(subCampaign);
      setName(subCampaign.name);
      setStatus(subCampaign.status);
      setAds(subCampaign.ads);
    }
  };

  const onRename = (newName: string) => {
    if (currentCampaign) {
      const updatedSubCampaignList = subCampaignList.map((campaign) => {
        if (campaign.id === currentCampaign.id) {
          return { ...campaign, name: newName };
        }
        return campaign;
      });

      setName(newName);
      setSubCampainList(updatedSubCampaignList);
      onChange(updatedSubCampaignList);
    }
  };

  const onEditStatus = (newStatus: boolean) => {
    if (currentCampaign) {
      const updatedSubCampaignList = subCampaignList.map((campaign) => {
        if (campaign.id === currentCampaign.id) {
          return { ...campaign, status: newStatus };
        }
        return campaign;
      });

      setStatus(newStatus);
      setSubCampainList(updatedSubCampaignList);
      onChange(updatedSubCampaignList);
    }
  };

  const handleAdvertisementChange = (
    advertisementDataList: Advertisement[]
  ) => {
    setAds(advertisementDataList);

    const updatedSubCampaignList = subCampaignList.map((campaign) => {
      if (campaign.id === currentCampaign.id) {
        return {
          ...campaign,
          ads: advertisementDataList,
        };
      }
      return campaign;
    });

    onChange(updatedSubCampaignList);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }} textAlign="center">
        Create Sub Campaign
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        {subCampaignList.map((campaign) => (
          <SubCampaignBox
            key={campaign.id}
            subCampaign={campaign}
            active={currentCampaign?.id === campaign.id}
            onClick={() => setInfo(campaign)}
          />
        ))}
        <AddCircleOutlineRoundedIcon
          onClick={addNewSubCampaign}
          sx={{
            color: "#1976d2",
            fontSize: 30,
            "&:hover": { transform: "scale(1.025)", cursor: "pointer" },
          }}
        />
      </Box>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="name"
            label="Sub campaign name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={hasError && name.trim() === ""}
            value={name}
            onChange={(e) => onRename(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status}
                onChange={() => onEditStatus(!status)}
                color="success"
                defaultChecked
              />
            }
            label="Active"
            sx={{ marginLeft: 5 }}
          />
        </Box>
      </FormControl>
      <AdvertisementForm
        ads={ads}
        hasError={hasError}
        onChange={handleAdvertisementChange}
      />
    </div>
  );
}

export default SubCampaignForm;
