import { useEffect } from "react";
import {isEmpty} from "lodash";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTasks,
  selectOptions,
  listTasks,
  listOptions,
} from '../taskSlice';

import { TextareaDebug } from "components";

const optionText=(option,value)=>{
  const ret =option.find(x=>x.value===value).text;
  return ret;
}

export const Tasks = () => {
  const items = useSelector(selectTasks);
  const options = useSelector(selectOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTasks());
    if (isEmpty(options)) dispatch(listOptions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);//, [dispatch]);

  const renderItems = (data) => {
    //was demonstrating usage of a non-array object,
    //flipping it back for 'normal' display syntax
    //const tasks = Object.keys(items).map((x) => items[x]);
    return items.map((item) => (
      <tr key={item.id}>
        <td><NavLink to={`/dev/tasks/${item.id}`}>{item.id}</NavLink></td>
        <td>{item.subject}</td>
        <td>{item.body}</td>
        <td>{optionText(options.status,item.status)}</td>
        <td>{optionText(options.result,item.result)}</td>
      </tr>
    ));
  }; 

  if (isEmpty(items) || isEmpty(options)) return (<>Loading...</>);

  return (
    <>
    <div><h4>Tasks</h4></div>
    <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Body</th>
            <th>Status</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>{renderItems(items)}</tbody>
      </table>
      <TextareaDebug value={{items,options}} />
    </>
  )
}
export default Tasks;
