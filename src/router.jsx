import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
const Tasks = lazy(() => import("./pages/-example-task-section/tasks/tasks"));
const Task = lazy(() => import("./pages/-example-task-section/task/task"));
// prettier-ignore
//const Contacts = lazy(() => import("./pages/-example-contact/contacts/contacts"));
//const Contact = lazy(() => import("./pages/-example-contact/contact/contact"));
const Scratchpad = lazy(() => import("./pages/dev-section/scratchpad"));
const Formhelper = lazy(() =>
  import("./components/formhelper/test/formhelper")
);
//not introducing jwt and private routes yet
const menu = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
  {
    text: "Dev",
    items: [
      //example of creating submenu (low css doesn't support it)
      { text: "Tasks", link: "/dev/tasks" },
      //{ text: "Contacts", link: "/dev/contacts" },
      { text: "Scratchpad", link: "/dev/scratchpad" },
      { text: "FormHelper", link: "/dev/formhelper" },
    ],
  },
];

const Route404 = () => {
  return (
    <div>
      <h4>404</h4>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App menu={menu} />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "dev",
        children: [
          {
            path: "formhelper",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Formhelper />
              </Suspense>
            ),
          },
          {
            path: "tasks",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Tasks />
              </Suspense>
            ),
          },
          {
            path: "tasks/:id",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Task />
              </Suspense>
            ),
          },
          {
            path: "scratchpad",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Scratchpad />
              </Suspense>
            ),
          },
        ],
      },
      { path: "", element: <Home /> },
      { path: "*", element: <Route404 /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
