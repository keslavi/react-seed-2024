//import './app.css';
import {Outlet as RouterOutlet} from 'react-router-dom';
import { ContainerFullWidth as Container } from '@/components';
import {Header} from '@/components';

export const App=(props)=> {
  const {menu}=props;

  return (
    <>
    <Container>
      <Header menu={menu}/>
      <RouterOutlet/>
    </Container>
    </>
  )
}

export default App
