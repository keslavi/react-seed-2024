import { useEffect } from "react";
import { isEmpty } from "lodash";
import { NavLink, useParams } from "react-router-dom";
//import { errorNotification,resolver } from "./validation/formvalidation";
import { useSelector, useDispatch } from "react-redux";
//prettier-ignore
import { 
  listOptions,
  retrieveTask, 
  upsertTask,
  selectOptions, 
  selectTask, 
} from "../taskSlice";

import { useForm } from "react-hook-form";
import { Row, Col, Input } from "@/components";

import { TextareaDebug } from "components";

export const Task = () => {
  const item = useSelector(selectTask);
  const option = useSelector(selectOptions);
  const dispatch = useDispatch();
  const { id } = useParams();

  // React hook form and validation***********************
  const {
    handleSubmit,
    control,
    //watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    //resolver,
    //mode:"onChange"
  });
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
    actTask_D(values);
    navigate("/tasks");
  };

  const onCancel = () => {
    actTask_Clear();
    navigate("/tasks");
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
          <Input name="status" options={option.status} control={control} />
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
