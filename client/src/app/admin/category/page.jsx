"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  FormControl,
  Card,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import BackPage from "../../../components/BackPage";

export default function Category() {
  useEffect(() => {
    axios.get("/api/categories/").then((response) => {
      setCategs(response.data);
    });
  }, []);

  const [categ, setCategs] = useState([]);

  const changeInput = (index, camp, value) => {
    let temp = [...categ];
    temp[index][camp] = value;
    // console.log(temp);
    setCategs(temp);
  };

  const blurSave = (id, index) => {
    let post = {
      id: categ[index].id,
      name: categ[index].name,
    };
    axios.put(`/api/categories/${id}`, post).then((response) => {
      // setCategs(response.data);
    });
  };

  const deleteRow = (id, i) => {
    let temp = [...categ];
    temp.splice(i, 1);
    setCategs(temp);
    axios.delete(`/api/categories/${id}`).then((response) => {
      console.log("Delete Succesfull");
    });
  };

  const addRow = (e) => {
    /*let temp = [...categ];
    temp.push({ id: categ.length + 1, name: "" });
    setCategs(temp);*/
    let post = { name: "" };
    axios.post(`/api/categories/`, post).then((response) => {
      let temp = [...categ];
      temp.push({ id: response.data, name: "" });
      setCategs(temp);
    });
    axios.get("/api/categories/").then((response) => {
      setCategs(response.data);
    });
  };

  return (
    <div className="justify-center">
      <BackPage />
      <Card className="p-4 mt-2" elevation={10} sx={{ width: "100%" }}>
        <Typography variant="h3" className="text-center">
          Categories Administration
        </Typography>{" "}
        <br />
        <Card elevation={10} sx={{ minHeight: 300 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categ.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <TextField
                      value={e.name}
                      variant="standard"
                      onChange={(ev) => changeInput(i, "name", ev.target.value)}
                      onBlur={() => blurSave(e.id, i)}
                    />
                  </TableCell>
                  <Button
                    className="mt-6"
                    variant="outlined"
                    color="primary"
                    onClick={() => deleteRow(e.id, i)}
                  >
                    Delete
                  </Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center text-center">
            <Button
              className="m-6"
              variant="outlined"
              color="secondary"
              onClick={addRow}
            >
              +
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
}
