import React, { useState } from "react";
import {
    Container, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Button, Box, Chip,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../store/tasksSlice";

const TaskList = () => {
    const tasks = useSelector(state => state.tasks);
    console.log(tasks)
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("All");

    const filteredTasks =
        filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
                <Typography variant="h4" className="heading-text">
                    Task List
                </Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Filter by Priority</InputLabel>
                    <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter by Priority">
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {filteredTasks.length === 0 ? (
                        <Typography style={{ textAlign: "center" }}>No tasks available.</Typography>
                    ) : (
                        filteredTasks.map((task) => (
                            <Paper key={task.id} sx={{
                                display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderRadius: "8px", backgroundColor: "#f5f5f5",
                            }}>
                                <div className="w-100">
                                    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                                        <Typography variant="body1">{task.text}</Typography>
                                        <Chip
                                            label={task.priority}
                                            sx={{
                                                backgroundColor:
                                                    task.priority === "High" ? "#d32f2f"
                                                        : task.priority === "Medium" ? "#ffa000"
                                                            : "#388e3c",
                                                color: "white",
                                                fontSize: "10px"
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between" }} className="pt-4">
                                        {task.weather && Object.keys(task.weather).length > 0 ? (
                                            typeof task.weather === "string" ? (
                                                <Typography sx={{ fontSize: "10px", color: "red", marginRight: "10px" }}>{task.weather}</Typography>
                                            ) : (
                                                <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
                                                    <Typography variant="body2">🌡{task.weather.temperature}°C</Typography>
                                                    <Typography variant="body2">{task.weather.condition}</Typography>
                                                    <img src={task.weather.icon} alt="Weather icon" width="30" />
                                                </div>
                                            )
                                        ) : (
                                            <Typography sx={{ fontSize: "12px" }}>General task</Typography>
                                        )}
                                        <Button variant="contained" color="error" onClick={() => dispatch(deleteTask(task.id))} style={{ textAlign: "right" }}>
                                            <FaTrash />
                                        </Button>
                                    </Box>
                                </div>
                            </Paper>
                        ))
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default TaskList;
