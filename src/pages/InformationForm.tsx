import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormData from "../types/FormData";

function InformationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (name && description) {
      setFormData({
        name: name,
        description: description,
      });
    }
  }, [name, description]);
  console.log(formData);

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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </div>
  );
}

export default InformationForm;
