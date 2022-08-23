import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'todo/fetchTasks',
  async (params, { getState }) => {
    const state = getState();
    const { todo: { limit, offset, sorting } } = state;
    const query = new URLSearchParams({
      ...(limit && { limit }),
      ...(offset && { offset }),
      ...(sorting && { ...sorting }),
    });
    const response = await fetch(`/api/tasks?${query}`);
    return response.json();
  },
);

export const createTask = createAsyncThunk(
  'todo/createTask',
  async (form) => fetch('/api/tasks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }),
);

export const updateTaskText = createAsyncThunk(
  'todo/updateTaskText',
  async ({ id, text }) => {
    const result = await fetch(`/api/tasks/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    return result.status;
  },
);

export const changeTaskStatus = createAsyncThunk(
  'todo/changeTaskStatus',
  async ({ id, isDone }) => {
    const result = await fetch(`/api/tasks/change_status/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone }),
    });
    return result.status;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    limit: 3,
    offset: 0,
    sorting: {
      name: '',
      email: '',
      isDone: '',
    },
    tasks: [],
    totalTasksCount: 0,
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    changeSorting: (state, action) => {
      const prevSorting = state.sorting[action.payload];
      let nextSorting;
      switch (prevSorting) {
        case 'ASC': nextSorting = 'DESC'; break;
        case 'DESC': nextSorting = ''; break;
        default: nextSorting = ''; break;
      }
      state.sorting[action.payload] = nextSorting;
    },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload.tasks;
      state.totalTasksCount = action.payload.totalTasksCount;
    },
  },
});

export const { changeSorting, setOffset } = todoSlice.actions;
export default todoSlice.reducer;
