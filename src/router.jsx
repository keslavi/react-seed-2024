import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import App from "./app"; //router displays here

//things that are always loaded
//prettier-ignore
import { 
  Home, 
  About 
} from "./pages";

/*
  some codesplitting examples... 
  prevent overly large page loads from happening up front

  tasks, scratchpad aren't usually needed.
*/
const Tasks = lazy(() => import("./pages/task-section-EXAMPLE/tasks/tasks"));
const Task = lazy(() => import("./pages/task-section-EXAMPLE/task/task"));
const Scratchpad = lazy(() => import("./pages/dev-section/scratchpad"));

//not introducing jwt and private routes yet
const menu = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
  {
    text: "Dev",
    items: [
      //example of creating submenu (low css doesn't support it)
      { text: "Tasks", link: "/dev/tasks" },
      { text: "Scratchpad", link: "/dev/scratchpad" },
    ],
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App menu={menu} />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/dev">
            <Route
              path="tasks"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Tasks />
                </Suspense>
              }
            />
            <Route
              path="tasks/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Task />
                </Suspense>
              }
            />
            <Route
              path="scratchpad"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Scratchpad />
                </Suspense>
              }
            />
          </Route>

          <Route path="" element={<Home />} />
          <Route path="*" element={<Route404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

const Route404 = () => {
  return (
    <div>
      <h4>404</h4>
    </div>
  );
};