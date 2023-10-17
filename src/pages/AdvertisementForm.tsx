import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Advertisement } from "../types/Campaign";

interface AdvertisementProps {
  ads: Advertisement[];
  onChange: (advertisementDataList: Advertisement[]) => void;
}

function AdvertisementForm(props: AdvertisementProps) {
  const { ads, onChange } = props;
  const [advertisementList, setAdvertisementList] = useState<Advertisement[]>(
    []
  );

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [checkedAll, setCheckedAll] = useState([false]);

  useEffect(() => {
    if (Array.isArray(ads)) {
      setAdvertisementList(ads);
    }
  }, [ads]);

  const addNewAdvertisement = () => {
    let newId = advertisementList.length + 1;
    let newName = `Advertisement ${newId}`;

    while (
      advertisementList.some((advertisement) => advertisement.name === newName)
    ) {
      newId++;
      newName = `Advertisement ${newId}`;
    }

    const newAdvertisement = {
      id: newId,
      name: newName,
      quantity: 0,
    };

    const newList = [...advertisementList, newAdvertisement];

    onChange(newList);
    setAdvertisementList(newList);

    setCheckedAll([...checkedAll, false]);
    setName(newAdvertisement.name);
    setQuantity(newAdvertisement.quantity);
  };

  const onRename = (id: number, newName: string) => {
    const updatedAdvertisementList = advertisementList.map((advertisement) => {
      if (advertisement.id === id) {
        return { ...advertisement, name: newName };
      }
      return advertisement;
    });

    setName(newName);
    setAdvertisementList(updatedAdvertisementList);
    onChange(updatedAdvertisementList);
  };

  const onEditQuantity = (id: number, newQuantity: number) => {
    const updatedAdvertisementList = advertisementList.map((advertisement) => {
      if (advertisement.id === id) {
        return { ...advertisement, quantity: newQuantity };
      }
      return advertisement;
    });

    setQuantity(newQuantity);
    setAdvertisementList(updatedAdvertisementList);
    onChange(updatedAdvertisementList);
  };

  const onRemove = (id: number) => {
    const newAdsList = advertisementList.filter(
      (advertisement) => advertisement.id !== id
    );

    setAdvertisementList(newAdsList);
    onChange(newAdsList);
  };

  const onRemoveAll = () => {
    const newAdsList = advertisementList.splice(0, advertisementList.length);

    setAdvertisementList(newAdsList);
    onChange(newAdsList);
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedAll = [...checkedAll];
    newCheckedAll[index] = !newCheckedAll[index];
    setCheckedAll(newCheckedAll);
  };

  const handleSelectAll = () => {
    const allChecked = checkedAll.every((isChecked) => isChecked);
    const newCheckedAll = advertisementList.map(() => !allChecked);
    setCheckedAll(newCheckedAll);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Advertisement List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: 0 }}>
                <Checkbox
                  checked={checkedAll.every((isChecked) => isChecked)}
                  indeterminate={
                    checkedAll.some((isChecked) => isChecked) &&
                    !checkedAll.every((isChecked) => isChecked)
                  }
                  onChange={handleSelectAll}
                  disabled={advertisementList.length === 0}
                />
              </TableCell>
              <TableCell align="left" sx={{ padding: 0 }}>
                <Typography>Advertisement name *</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: 0 }}>
                <Typography>Quantity *</Typography>
              </TableCell>
              <TableCell align="right" sx={{ padding: 0 }}>
                {checkedAll.every((isChecked) => isChecked) ? (
                  <Tooltip title="Delete" placement="right">
                    <DeleteForeverIcon
                      onClick={onRemoveAll}
                      sx={{
                        "&:hover": {
                          transform: "scale(1.025)",
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Button variant="contained" onClick={addNewAdvertisement}>
                    + Add
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advertisementList.map((advertisement, index) => (
              <TableRow key={advertisement.id}>
                <TableCell sx={{ padding: 0 }}>
                  <Checkbox
                    checked={checkedAll[index]}
                    onChange={(e) => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <TextField
                    id="name"
                    variant="standard"
                    margin="normal"
                    hiddenLabel
                    required
                    fullWidth
                    defaultValue={advertisement.name}
                    onChange={(e) => onRename(advertisement.id, e.target.value)}
                  />
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <TextField
                    id="quantity"
                    variant="standard"
                    margin="normal"
                    hiddenLabel
                    required
                    fullWidth
                    defaultValue={advertisement.quantity}
                    onChange={(e) =>
                      onEditQuantity(advertisement.id, Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell align="right" sx={{ padding: 0 }}>
                  <Tooltip title="Delete" placement="right">
                    <DeleteForeverIcon
                      onClick={() => onRemove(advertisement.id)}
                      sx={{
                        "&:hover": {
                          transform: "scale(1.025)",
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdvertisementForm;
