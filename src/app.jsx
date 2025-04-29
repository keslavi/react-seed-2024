//import './app.css';
import { Outlet as RouterOutlet } from "react-router-dom";
import { ContainerFullWidth } from "@/components";
import { Header } from "./components/header";

export const App = (props) => {
  const { menu } = props;

  return (
    <>
      <Header menu={menu} />
      {/* <ContainerFullWidth> */}
      <div style={{ width: "100%" }}>
        <RouterOutlet />
      </div>
      {/* </ContainerFullWidth> */}
    </>
  );
};

export default App;
