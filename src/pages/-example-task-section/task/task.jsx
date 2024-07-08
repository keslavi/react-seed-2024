import { useEffect } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { 
  Col,
  Input,
  //AutoComplete, //ALTERNATE to singe Input
  //TextField,    //ALTERNATE to singe Input
  Row,
  TextareaDebug,
} from "components";

//prettier-ignore
import { 
  listOptions,
  retrieveTask, 
  upsertTask,
  selectOptions, 
  selectTask, 
} from "../slice/taskSlice";

import { resolver, errorNotification } from "./validation";

export const Task = () => {
  const item = useSelector(selectTask);
  const option = useSelector(selectOptions);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  // React hook form and validation***********************
  const {
    control,
    formState: { errors },
    //getValues,
    handleSubmit,
    reset,
    //setValue,
    //watch,
  } = useForm({
    resolver,
    //mode:"onChange"
  });
  errorNotification(errors);
  // end React hook form and validation***********************

  useEffect(() => {
    dispatch(retrieveTask(id));
    if (isEmpty(option)) dispatch(listOptions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //[dispatch]);

  useEffect(() => {
    if (!isEmpty(item)) {
      reset(item);
    }
  }, [item]);

  const onSubmit = (values) => {
    //note:  values can't get here prior to form & business validation
    toast.info(
      <div>
        Submit clicked
        <br />
        <textarea
          rows={5}
          cols={30}
          defaultValue={JSON.stringify(values, null, 2)}
        ></textarea>
      </div>
    );

    dispatch(upsertTask(values));
  };

  const onDelete = () => {
    const values = { ...item };
    //actTask_D(values);
    navigate("/dev/tasks");
  };

  const onCancel = () => {
    //actTask_Clear();
    navigate("/dev/tasks");
  };

  if (isEmpty(item) || isEmpty(option)) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h4>Task</h4>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hidden">
          <Row>
            <div className="hidden"> Col is INSIDE Input</div>
            <Input name="id" control={control} />
          </Row>
        </div>
        <Row>
          <div className="hidden"> Col is INSIDE Input</div>
          <Input name="subject" control={control} />
          <Input name="body" control={control} />
        </Row>
        <Row>
          <Input name="status"  control={control} />
          <Input name="result" options={option.result} control={control} />
        </Row>
        <Row>
          <Col>
            <input type="submit" value="Submit" />
            &nbsp;&nbsp;
            <input type="button" onClick={() => onCancel()} value="Cancel" />
            &nbsp;&nbsp;
            <input type="button" onClick={() => onDelete()} value="Delete" />
          </Col>
        </Row>
      </form>
      <TextareaDebug value={{ item, option }} />
    </>
  );
};
export default Task;
