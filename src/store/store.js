import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

import task from 'pages/task-section-EXAMPLE/taskSlice';
//'pages/task-section-EXAMPLE/task-reducer';

// const reducer = combineReducers({
//   task,
// });

export const store = configureStore({
  reducer: {
    task,
  },
});


