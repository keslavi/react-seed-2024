import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
//import { toast } from "react-toastify";
//import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
//import { Button } from "@mui/material";
import { processChildren } from "./formhelper.utility";
//import { store } from "store";

//console.log group test: uncomment and view in console
//import "helpers/extensions/console-extension.testmanual";

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
  //status: "3",
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
};

const chidrenDefault = () => {
  return (
    <>
      <Row>
        <Input name="subject" label="Subject" />
      </Row>
      <Row>
        <Input name="body" label="Body" />
      </Row>
      <Row>
        <Input
          name="names"
          label="Names (checkbox)"
          optionscheckbox={option0.task.names}
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
      
      {/* Masked Input Examples */}
      <Row>
        <h3>Masked Input Examples</h3>
      </Row>
      <Row>
        <Input 
          name="ssn" 
          label="SSN" 
          mask="ssn"
          info="Enter your 9-digit SSN in format XXX-XX-XXXX"
        />
        <Input 
          name="tin" 
          label="TIN" 
          mask="ssn"
          info="Enter your 9-digit TIN in format XXX-XX-XXXX"
        />
      </Row>
      <Row>
        <Input 
          name="phone" 
          label="Phone Number" 
          mask="phone"
          info="Enter your phone number in format (XXX) XXX-XXXX"
        />
        <Input 
          name="phoneExt" 
          label="Phone with Extension" 
          mask="phoneExt"
          info="Enter your phone number with extension"
        />
      </Row>
      <Row>
        <Input 
          name="creditCard" 
          label="Credit Card Number" 
          mask="creditCard"
          info="Enter your 16-digit credit card number"
        />
        <Input 
          name="creditCardExpiry" 
          label="Credit Card Expiry" 
          mask="creditCardExpiry"
          info="Enter expiry date in MM/YY format"
        />
      </Row>
      <Row>
        <Input 
          name="zipCode" 
          label="ZIP Code" 
          mask="zipCode"
          info="Enter 5-digit ZIP code"
        />
        <Input 
          name="zipCodePlus4" 
          label="ZIP+4 Code" 
          mask="zipCodePlus4"
          info="Enter ZIP+4 code in format XXXXX-XXXX"
        />
      </Row>
      
      {/* Custom Pattern Examples */}
      <Row>
        <h3>Custom Pattern Examples</h3>
      </Row>
      <Row>
        <Input 
          name="customPattern1" 
          label="Custom: ##-##-####" 
          mask="##-##-####"
          info="Custom pattern: 2 digits, dash, 2 digits, dash, 4 digits"
        />
        <Input 
          name="customPattern2" 
          label="Custom: AAA-####" 
          mask="AAA-####"
          info="Custom pattern: 3 letters, dash, 4 digits"
        />
      </Row>
      <Row>
        <Input 
          name="customPattern3" 
          label="Custom: +## (###) ###-####" 
          mask="+## (###) ###-####"
          info="Custom pattern: International phone with country code"
        />
        <Input 
          name="customPattern4" 
          label="Custom: PROD-####-AAA" 
          mask="PROD-####-AAA"
          info="Custom pattern: Product code format"
        />
      </Row>
      
      {/* Persistent (Always Visible) Examples */}
      <Row>
        <h3>Persistent (Always Visible) Examples</h3>
      </Row>
      <Row>
        <Input 
          name="currency" 
          label="Amount" 
          mask="currency"
          persistent
          info="Enter amount with dollar sign and commas (always visible)"
        />
      </Row>
      
      {/* Password Input Examples */}
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
      
      {/* Guided Data Input Examples */}
      <Row>
        <h3>Guided Data Input Examples</h3>
      </Row>
      <Row>
        <Input 
          name="dateOfBirth" 
          label="Date of Birth" 
          mask="date"
          info="Enter date in MM/DD/YYYY format"
        />
        <Input 
          name="appointmentTime" 
          label="Appointment Time" 
          mask="time"
          info="Enter time in HH:MM format (24-hour)"
        />
      </Row>
      <Row>
        <Input 
          name="currency" 
          label="Amount" 
          mask="currency"
          persistent
          info="Enter amount with dollar sign and commas (always visible)"
        />
        <Input 
          name="percentage" 
          label="Percentage" 
          mask="percentage"
          info="Enter percentage value"
        />
      </Row>
      <Row>
        <Input 
          name="customPattern" 
          label="Custom Pattern (##-##-##)" 
          mask="##-##-##"
          info="Custom 6-digit pattern with dashes"
        />
        <Input 
          name="formattedValue" 
          label="Formatted Value (####-####)" 
          format="####-####"
          info="This uses format instead of mask"
        />
      </Row>
      
      {/* Additional Examples */}
      <Row>
        <h3>Additional Examples</h3>
      </Row>
      <Row>
        <Input 
          name="licensePlate" 
          label="License Plate" 
          mask="AAA-####"
          info="Enter license plate in format ABC-1234"
        />
        <Input 
          name="productCode" 
          label="Product Code" 
          mask="##-AAA-####"
          info="Enter product code in format 12-ABC-3456"
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
