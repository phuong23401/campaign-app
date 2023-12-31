import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CustomTabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
