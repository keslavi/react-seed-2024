import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { processChildren } from "./formhelper.utility";



//prettier-ignore
import { 
  Input,
  Row,
  Col,
  inputMask,
  LabelMask,
} from "components";

//prettier-ignore
import { 
  resolver, 
  errorNotification 
} from "./formhelpertestValidation";

const option0 = {
  task: {

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
        text: "whoops",
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

  result: 2,
  address: {
    line1: "ddd",
    line2: "A2L2",
    line3: "A2L3",
  },
  success: true,
  isDraft: true,
  // Sample data for masked inputs
  ssn: "123223234",
  tin: "987654321",
  phone: "5551234567",
  phoneExt: "5551234567",
  creditCard: "1234567890123456",
  creditCardExpiry: "1225",
  zipCode: "12345",
  zipCodePlus4: "123456789",
  dateOfBirth: "01011990",
  appointmentTime: "1430",
  currency: "1234567",
  percentage: "85",
  customPattern: "123456",
  formattedValue: "12345678",
  licensePlate: "ABC1234",
  productCode: "12ABC3456",
  // Sample data for partial masking examples
  creditCardPartial: "1234567890123456",
  ssnPartial: "123456789",
  phonePartial: "5551234567",
  customPartial: "12345678",
};

const chidrenDefault = () => {
  return (
    <>
      <Row>
        <Input 
          name="subject" 
          label="Subject" 
          placeholder="Enter subject" 
          info="header1|body1"
        />
      </Row>
      <Row>
        <Input name="body" label="Body" />
      </Row>
      <Row>
        <Input
          name="names"
          label="Names (checkbox)"
          optionsCheckbox={option0.task.names}
          info="header1|body1"
        />
        <Input
          size={{xs:6}}        
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={option0.task.names}
        />
      </Row>
      <Row>
        <Input 
          name="status" 
          label="Status (select)"
          select 
          options={option0.task.status} 
//          placeholder="Select a status" 
          info="header2|body2"
        />
        <Input 
          name="result" 
          label="Result (autocomplete)" 
          options={option0.task.result} 
          info="header3|body3"
        />
      </Row>
      <Row>
        <h3>Masked Input Examples</h3>
      </Row>
      <Row>
        <Input 
          name="ssn" 
          label="SSN" 
          mask={inputMask.ssn}
          info="Enter your 9-digit SSN in format XXX-XX-XXXX"
        />
        <Input 
          name="ssn2" 
          label="SSN2" 
          mask={inputMask.ssn}
          info="Enter your 9-digit SSN in format XXX-XX-XXXX"
        />
      </Row>
      <Row>
        <Input 
          name="ssnPartial" 
          label="SSN (Partial Mask)" 
          mask={inputMask.ssn}
          showLast={4}
          info="SSN with partial masking - shows last 4 digits when masked"
        />
      </Row>
      <Row>
        <Input 
          name="licensePlate" 
          label="License Plate" 
          mask={inputMask.licensePlate}
          info="Enter license plate in format AAA-1234 (3 letters, dash, 4 numbers)"
        />
      </Row>

      <Row>
        <h3>Label Mask Examples</h3>
      </Row>
      <Row>
        <Col xs={6}>
          <h4>SSN Label Mask (Children)</h4>
          <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
        </Col>
        <Col xs={6}>
          <h4>SSN Label Mask (Text Prop)</h4>
          <LabelMask mask={inputMask.ssn} text="123456789" />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h4>Phone Number Label Mask</h4>
          <LabelMask mask={inputMask.phone}>5551234567</LabelMask>
        </Col>
        <Col xs={6}>
          <h4>License Plate Label Mask</h4>
          <LabelMask mask={inputMask.licensePlate}>ABC1234</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h4>Partial Mask (Last 4 digits)</h4>
          <LabelMask mask={inputMask.ssn} showLast={4}>123456789</LabelMask>
        </Col>
        <Col xs={6}>
          <h4>Persistent (Always Visible)</h4>
          <LabelMask mask={inputMask.ssn} persistent>123456789</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h4>With Label Heading Variant (h1)</h4>
          <LabelMask mask={inputMask.ssn} variant="h1">123456789</LabelMask>
        </Col>
        <Col xs={6}>
          <h4>With Custom Style</h4>
          <LabelMask 
            mask={inputMask.ssn} 
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '18px' }}
          >
            123456789
          </LabelMask>
        </Col>
      </Row>

      <Row>
        <h3>Password Input Examples</h3>
      </Row>
      <Row>
        <Input 
          name="password" 
          label="Password" 
          password
          info="Enter your password (with show/hide toggle)"
        />
        <Input 
          name="confirmPassword" 
          label="Confirm Password" 
          password
          info="Confirm your password"
        />
      </Row>
      


      


      

 
      
    </>
  );
};

export const Formhelper = (props) => {
  const [submitValues, setSubmitValues] = useState({});

  const item = props.item || item0;
  const option = props.option || option0;
  const TestComponent = props.TestComponent || null;
  const children = props.children || chidrenDefault();

  // React hook form and validation***********************
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver,
    defaultValues: item,
    mode: "onChange"
  });
  const attributes = { control, errors };
  useEffect(() => {
    if (errors) {
      errorNotification(errors);
    }
  }, [errors]);

  // Reset form with default values when item changes
  useEffect(() => {
    reset(item);
  }, [item, reset]);

  // Force reset on mount to ensure default values are set
  useEffect(() => {
    reset(item);
  }, []);
  // end React hook form and validation***********************

  const onSubmitSuccess = (values) => {
    setSubmitValues(values);
  };

  return (
    <>
      <br />
      <br />
      <br/>
      <h1>formhelper tester</h1>
      <ul>
        <li>
          this is a test <b>staging area</b> for the formhelper components
        </li>
        <li>allow for developer to look at tests visually</li>
        <li>tests are in formhelper/*.test.jsx</li>
      </ul>
      <form onSubmit={handleSubmit(onSubmitSuccess)}>
        {/* don't install components in here, use childrenDefault() */}
        {processChildren(children, attributes)}
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
};

export default Formhelper;
