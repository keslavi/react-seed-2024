import { useEffect } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import {
  Col,
  Input,
  Select, //ALTERNATE to singe Input
  TextField, //ALTERNATE to singe Input
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
} from "../slice/ztaskSlice-redux";

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
    setValue,
    //watch,
  } = useForm({
    resolver,
    //mode:"onChange"
  });
  const attributes = { control, errors };
  useEffect(() => {
    if (errors) {
      errorNotification(errors);
    }
  }, [errors]);
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

  const onContinueSave = (event) => {
    const id = event.currentTarget.id;
    switch (id) {
      case "btnContinue":
//        setValue("isDraft", false); 
        window.isDraft=false;
        break;
      case "btnSave":
//        setValue("isDraft", true);
        window.isDraft=true;
        break;
      default:
        toast.error(`onContinueSave ${id} not found`);
        return;
    }
    event.currentTarget.form.requestSubmit();
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
        <Button id="btnContinue" onClick={onContinueSave}>
          Continue
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button id="btnSave" onClick={onContinueSave}>
          Save
        </Button>
        <div className="hidden">
          <Row>
            <div className="hidden"> Col is INSIDE Input</div>
            <Input name="id" {...attributes} />
          </Row>
        </div>
        <Row>
          <div className="hidden"> Col is INSIDE Input</div>
          <Input name="subject" label="Subject" {...attributes} />
          {/* <TextField name="subject" label="Name" {...attributes} /> */}
          <Input name="body" label="Body" {...attributes} />
        </Row>
        <Row>
          <Input
            name="status"
            label="Status"
            options={option.status}
            {...attributes}
          />
          {/* <Select name="status" label="Status" options={option.status}  {...attributes} /> */}
          <Input
            name="result"
            label="Result"
            options={option.result}
            {...attributes}
          />
        </Row>
        <Row>
          <Input name="address.line1" label="address" {...attributes} />
        </Row>
        <Row>
          <Input name="address.line2" {...attributes} />
        </Row>
        <Row>
          <Input name="address.line3" {...attributes} />
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
