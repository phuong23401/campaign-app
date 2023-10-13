import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Information } from "../types/Campaign";

function InformationForm() {
  const [formData, setFormData] = useState<Information>({
    name: "",
    describe: "",
  });
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");

  useEffect(() => {
    if (name && describe) {
      setFormData({
        name: name,
        describe: describe,
      });
    }
  }, [name, describe]);

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Enter Campaign Information
      </Typography>
      <form>
        <TextField
          id="name"
          label="Campaign name"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          label="Campaign description"
          variant="outlined"
          margin="dense"
          fullWidth
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
        />
      </form>
    </div>
  );
}

export default InformationForm;
