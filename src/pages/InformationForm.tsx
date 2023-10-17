import { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Information } from "../types/Campaign";

interface InformationProps {
  onChange: (informationData: Information) => void;
}

function InformationForm(props: InformationProps) {
  const { onChange } = props;
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");

  useEffect(() => {
    onChange({ name, describe });
  }, [name, describe, onChange]);

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }} textAlign="center">
        Enter Campaign Information
      </Typography>
      <FormControl fullWidth>
        <TextField
          id="name"
          label="Campaign name"
          variant="outlined"
          margin="dense"
          required
          defaultValue={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          label="Campaign description"
          variant="outlined"
          margin="dense"
          defaultValue={describe}
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
        />
      </FormControl>
    </div>
  );
}

export default InformationForm;
