import { create } from "zustand";
import { devtools } from "zustand/middleware";

import api from "./slice/api-slice"; //http request counter
import option from "./slice/optionSlice";
import task from "./slice/task-slice";

export const useStore = create(devtools((...a) => ({
    ...api(...a),//http request counter
    ...option(...a),
    ...task(...a),
  }))
);
