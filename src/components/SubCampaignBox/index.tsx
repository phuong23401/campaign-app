import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { SubCampaign, Advertisement } from "../../types/Campaign";

interface SubCampaignBoxProps {
  subCampaign: SubCampaign;
  ads: Advertisement[];
  active: boolean;
  onClick: () => void;
}

function SubCampaignBox(props: SubCampaignBoxProps) {
  const { subCampaign, ads, active, onClick } = props;
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (ads.length > 0) {
      const _totalQuantity = ads.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
      setTotalQuantity(_totalQuantity);
    }
  }, [ads]);

  return (
    <Box
      onClick={onClick}
      textAlign="center"
      sx={{
        p: 3,
        border: active ? "2px solid #1976d2" : "1px solid #000",
        borderRadius: 1.5,
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Typography>
        {subCampaign.name}&ensp;
        <CheckCircleRoundedIcon
          sx={{
            color: subCampaign.status === true ? "green" : "grey",
            fontSize: 20,
          }}
        />
      </Typography>
      <Tooltip title="Ads quantity" placement="left">
        <Typography>{totalQuantity}</Typography>
      </Tooltip>
    </Box>
  );
}

export default SubCampaignBox;
