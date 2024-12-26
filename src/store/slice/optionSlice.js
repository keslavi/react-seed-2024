import api from "@/store/api";
import { toast } from "react-toastify";

export const optionSlice = (set, get) => ({
  options: {},

  optionList: async () => {
    const url = "option";
    try {
      let options = get().options;
      const res = await api.get(url);
      options = { ...options, ...res.data };
      set({ options }, undefined, url);
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
  optionRetrieve: async (id) => {
    const url = `option\${id}`;
    try {
      let option = get().option;
      if (!option.hasOwnProperty(id)) {
        const res = await api.get(url);
        option = { ...option, ...res.data };
        set({ option }, undefined, url);
      }
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
});

export default optionSlice;
