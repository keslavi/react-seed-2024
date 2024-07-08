import { configureStore } from '@reduxjs/toolkit';

import task from 'pages/-example-task-section/slice/taskSlice';

export const store = configureStore({
  reducer: {
    task,
  },
});


