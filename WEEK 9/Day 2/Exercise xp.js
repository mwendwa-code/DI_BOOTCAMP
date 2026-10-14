import { createSlice, nanoid } from '@reduxjs/toolkit';

const getTodayKey = () => new Date().toISOString().split('T')[0];

const getInitialTasks = () => {
  const date = getTodayKey();

  return {
    selectedDate: date,
    tasks: {
      [date]: [
        { id: nanoid(), text: 'Review project brief', completed: false },
        { id: nanoid(), text: 'Prepare for tomorrow', completed: true },
      ],
    },
  };
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState: getInitialTasks(),
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    addTask(state, action) {
      const { date, text } = action.payload;
      const trimmedText = text.trim();

      if (!trimmedText) return;

      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }

      state.tasks[date].push({
        id: nanoid(),
        text: trimmedText,
        completed: false,
      });
    },
    editTask(state, action) {
      const { date, id, text, completed } = action.payload;
      const task = state.tasks[date]?.find((item) => item.id === id);

      if (!task) return;

      if (typeof text === 'string') {
        const trimmedText = text.trim();
        if (trimmedText) {
          task.text = trimmedText;
        }
      }

      if (typeof completed === 'boolean') {
        task.completed = completed;
      }
    },
    deleteTask(state, action) {
      const { date, id } = action.payload;

      if (!state.tasks[date]) return;

      state.tasks[date] = state.tasks[date].filter((task) => task.id !== id);
    },
  },
});

export const { setSelectedDate, addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;