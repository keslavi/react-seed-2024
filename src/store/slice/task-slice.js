import api from "@/store/api";
import { toast } from "react-toastify";

export const taskSlice = (get, set) => ({
  tasks: [],
  task: {},

  taskList: async () => {
    const url = "task";
    try {
      const res = await api.get(url);
      const tasks = res.data;
      set({ tasks }, undefined, url);
      get().optionRetrieve("task"); //loads using the other slice
    } catch (e) {
      toast.error(`<>${url} <br/>${e.message}`);
    }
  },
  taskRetrieve: async (id) => {
    const url = `task/${id}`;
    try {
      const res = await api.get(url);
      const task = res.data;
      set({ task }, undefined, url);
      get().optionRetrieve("task"); //loads using the other slice
    } catch (e) {
      toast.error(`<>${url} <br/>${e.message}`);
    }
  },
  taskUpsert: async (kvp) => {
    const url = "task";
    try {
      let res = await api.post(url, kvp);
      const task = res.data;
      set({ task }, undefined, `${url}Upsert`);
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
  taskDelete: async (id) => {
    const url = "task";
    const kvp = { id, delete: true };
    try {
      let res = await api.post(url, kvp);
      if (res.data.deleted) {
        set({ task:{} }, undefined, `${url}Delete`);
      } else {
        toast.error ("something went wrong, item not deleted in api");
      }
    } catch (e) {
      toast.error(`<>${url} Delete ${id} error<br/>${e.message}</>`);
    }
  },
});

export default taskSlice;

