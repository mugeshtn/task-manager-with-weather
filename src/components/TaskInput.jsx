import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { addTask } from "../store/tasksSlice";
import { useDispatch } from "react-redux";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();
  const handleAddTask = () => {
    if (!task.trim()) return;

    dispatch(addTask({ text: task, priority })); 
    setTask("");
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
        <Typography variant="h4" className="heading-text">
          Add New Task
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Enter your task..."
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskInput;
