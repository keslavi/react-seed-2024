import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
//import { toast } from "react-toastify";
//import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
//import { store } from "store";

//prettier-ignore
import { 
  Input,
  Row,
  Col, 
  //TextareaDebug //actual textarea for easier testing
} from "components";

//prettier-ignore
import { 
  resolver, 
  errorNotification 
} from "./formhelpertestValidation";

const option0 = {
  task: {
    // names: [
    //   "steve",
    //   "cindy",
    //   "riley",
    //   "whatever",
    // ],
    names: [
      {
        key: 1,
        text: "aaa",
      },
      {
        key: 2,
        text: "bbb",
      },
      {
        key: 3,
        text: "ccc",
      },
      {
        key: 4,
        text: "ddd",
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

const item0 = {
  id: "2",
  subject: "Subject b",
  names: [1, 2],
  names2: [3, 4],
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
  const [submitValues, setSubmitValues] = useState({});

  let item =  props.item || item0;

  const option = props.option || option0;
  const TestComponent = props.TestComponent || null;
//console.log ("data: ", JSON.stringify({item,option}) );

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
    defaultValues: item,
    //mode:"onChange"
  });
  const attributes = { control, errors }; 
  useEffect(() => {
    if (errors) {
      errorNotification(errors);
    }
  }, [errors]);
  // end React hook form and validation***********************

  const onSubmitSuccess = (values) => {
    setSubmitValues(values);
  };

  if (!isEmpty(props.children)) {
    return (
      <>
        <h1>formhelper tester (single component) </h1>
        <h2>testing single component from unit test. this updated</h2>
        <h3>
        {JSON.stringify({item,option}, null, 2)}
        </h3>
        {/* <textarea id="hmm" rows={20} cols={50} value={JSON.stringify({item,options}, null, 2)} readOnly /> */}
        <form onSubmit={handleSubmit(onSubmitSuccess)}>
          <Row>
            {React.Children.map(props.children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, attributes);
              }
              return child;
            })}
          </Row>
          <Row>
            <Col>
              <input name="btnSubmit" type="submit" value="Submit" />
            </Col>
          </Row>
        </form>
        <label>submitValues</label>
        <br />
        <textarea
          data-testid="elSubmitValues"
          rows={20}
          cols={50}
          value={JSON.stringify(submitValues, null, 2)}
          readOnly 
        />
      </>
    );
  }

  //not needed for test
  console.log("cccccc");
  return (
    <>
      <br />
      <br />
      <h1>formhelper tester</h1>
      <ul>
        <li>
          this is a test <b>staging area</b> for the formhelper components
        </li>
        <li>allows for developer to look at tests visually</li>
        <li>tests are in formhelper/*.test.jsx</li>
      </ul>
      <form onSubmit={handleSubmit(onSubmitSuccess)}>
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
            optionscheckbox={option.task.names}
            {...attributes}
          />
          <Input
            name="names2"
            label="Names2 (multiselect)"
            optionsMulti={option.task.names}
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
        <Row>
          <Col>
            <input name="btnSubmit" type="submit" value="Submit" />
          </Col>
        </Row>
      </form>
      <label>submitValues</label>
      <br />
      <textarea
        rows={20}
        cols={50}
        data-testid="elSubmitValues"
        value={JSON.stringify(submitValues, null, 2)}
        readOnly
      />
    </>
  );
};

export default FormHelperTester;

