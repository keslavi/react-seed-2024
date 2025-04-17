import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
//import { toast } from "react-toastify";
//import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
//import { store } from "store";

//prettier-ignore
import { 
  Input,
  //not strictly needed but allows developer to view the form more easily
  Row,
  Col, 
  TextareaDebug
} from "components";

//prettier-ignore
import { 
  resolver, 
  errorNotification 
} from "./formhelpertestValidation";

const option = {
  task: {
    // names: [
    //   "steve",
    //   "cindy",
    //   "riley",
    //   "whatever",
    // ],
    names: [
      {
        key: 0,
        text: "steve",
      },
      {
        key: 1,
        text: "cindy",
      },
      {
        key: 2,
        text: "riley",
      },
      {
        key: 3,
        text: "whatever",
      },
    ],

    status: [
      {
        key: 0,
        text: "pending",
      },
      {
        key: 1,
        text: "in progress",
      },
      {
        key: 2,
        text: "completed",
      },
      {
        key: 3,
        text: "cancelled",
      },
    ],
    result: [
      {
        key: 0,
        text: "",
      },
      {
        key: 1,
        text: "good",
      },
      {
        key: 2,
        text: "not good",
      },
      {
        key: 3,
        text: "who knows",
      },
    ],
  },
};

const item = {
  id: "2",
  subject: "Subject b",
  names: ["steve", "cindy"],
  body: "Body b",
  status: "1",
  result: 2,
  address: {
    line1: "ddd",
    line2: "A2L2",
    line3: "A2L3",
  },
  success: true,
  isDraft: true,
};

export const FormHelperTester = (props) => {
  const { submitValues, setSubmitValues } = useState({});

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

  const onSubmit = (values) => {
    //note:  values can't get here prior to form & business validation
    setSubmitValues(values);
  };

  //not needed for test
  // if (isEmpty(item) || isEmpty(option)) return <div>loading...</div>;
  return (
    <>
      <br />
      <br />
      <div>
        <h1>formhelper tester</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <div className="hidden"> Col is INSIDE Input</div>
          <Input name="subject" label="Subject" {...attributes} />
        </Row>
        <Row>
          <Input name="body" label="Body" {...attributes} />
        </Row>
        <Row>
          <Input
            name="names"
            label="Names (checkbox)"
            optionscheckbox={
              option.task.names /*["steve","cindy", "riley", "whatever"]*/
            }
            {...attributes}
          />
        </Row>

        <Row>
          <Input
            name="status"
            label="Status"
            options={option.task.status}
            {...attributes}
          />
          {/* <Select name="status" label="Status" options={option.status}  {...attributes} /> */}
          <Input
            name="result"
            label="Result"
            options={option.task.result}
            {...attributes}
          />
          {/* <Input datepicker name="dfrom" label="From" {...attributes} /> */}
        </Row>
        {/* <Row>
          <Input name="address.line1" label="address" {...attributes} />
        </Row>
        <Row>
          <Input name="address.line2" {...attributes} />
        </Row>
        <Row>
          <Input name="address.line3" {...attributes} />
        </Row> */}
        <Row>
          <Col>
            <input name="btnSubmit" type="submit" value="Submit" />
            {/* &nbsp;&nbsp;
            <input type="button" onClick={() => onCancel()} value="Cancel" />
            &nbsp;&nbsp;
            <input type="button" onClick={() => onDelete()} value="Delete" /> */}
          </Col>
        </Row>
      </form>
      <TextareaDebug value={{ item, option }} />
    </>
  );
};
export default FormHelperTester;
