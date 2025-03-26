import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherDetails } from "../utils/weather";

export const addTask = createAsyncThunk(
    "tasks/addTaskAsync",
    async (task) => {
        const outdoorKeywords = ["run", "walk", "cycling", "hiking", "picnic"];
        const isOutdoor = outdoorKeywords.some((word) => task.text.toLowerCase().includes(word));

        let newTask = { id: Date.now(), text: task.text, priority: task.priority, weather: null };

        if (isOutdoor) {
            try {
                const weather = await weatherDetails();
                if (weather.temperature !== undefined || weather.condition !== undefined) {
                    newTask.weather = weather;
                }else{
                    newTask.weather = "weather data not available for current location"
                }
            } catch (error) {
                console.error("Failed to fetch weather details:", error);
            }
        }

        return newTask;
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks")) || [],
    reducers: {
        deleteTask: (state, action) => {
            const updatedTasks = state.filter((task) => task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state));
        });
    }
});

export const { deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
