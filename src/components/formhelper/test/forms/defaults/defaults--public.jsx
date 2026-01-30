import { yup } from "@/helpers/form-validation";
import { Button, ListItemText } from "@mui/material";
import {
  Col,
  Row,
  TableRows,

  AlertInline,
  BtnContinueSave,
  Fieldset,
  Icon,
  iconType,
  Input,
  inputMask,
  LabelHeading,
  LabelMask,
} from "components";

import { color } from "@/theme-material";


//schema, options, item are below Children 


export const ChildrenDefault = () => {
  return (
    <>
      <h1>h1-h6 non Fieldset Example</h1>
      <br />
      <h1>1 This is a sample h1</h1>
      <h2>2 This is a sample h2</h2>
      <h3>3 This is a sample h3</h3>
      <h4>4 regular sample h4</h4>
      <h4 data-h4-color-alt>4 data-h4-color-alt h4</h4>
      <h4 data-h4-subtitle>4 data-h4-subtitle h4</h4>
      <h5>5 This is a sample h5</h5>
      <h6>6 This is a sample h6</h6>
      <hr />
      <h1>h1-h6 Fieldset Example</h1>
      <Fieldset>
        <h1>1 This is a sample h1</h1>
        <h2>2 This is a sample h2</h2>
        <h3>3 This is a sample h3</h3>
        <h4>4 regular sample h4</h4>
        <h4 data-h4-color-alt>4 data-h4-color-alt h4</h4>
        <h4 data-h4-subtitle>4 data-h4-subtitle h4</h4>
        <h5>5 This is a sample h5</h5>
        <h6>6 This is a sample h6</h6>
      </Fieldset>
      <br/>
      <h1>LabelHeadings & TableRows</h1>
      <Fieldset>
        <TableRows>
          <Row>
            <Col style={{flex:1}}>
              <b>Style/Variant<br/>
                {/* LabelHeading<br/> */}
                {/* NOT &lt;h&gt; */}
              </b>
            </Col>
            <Col style={{flex:1}}>
              <b>H1</b>            
            </Col>
            <Col style={{flex:1}}>
              <b>H2</b>            
            </Col>
            <Col style={{flex:1}}>
              <b>H3</b>            
            </Col>
            <Col style={{flex:1}}>
              <b>H4</b>            
            </Col>
            <Col style={{flex:1}}>
              <b>H5</b>            
            </Col>
            <Col style={{flex:1}}>
              <b>H6</b>            
            </Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>light</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" light>H1 Light</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" light>H2 Light</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" light>H3 Light</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" light>H4 Light</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" light>H5 Light</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" light>H6 Light</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>bold</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" bold>H1 Bold</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" bold>H2 Bold</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" bold>H3 Bold</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" bold>H4 Bold</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" bold>H5 Bold</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" bold>H6 Bold</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>boldish</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" boldish>H1 Boldish</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" boldish>H2 Boldish</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" boldish>H3 Boldish</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" boldish>H4 Boldish</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" boldish>H5 Boldish</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" boldish>H6 Boldish</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>regular</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" regular>H1 Regular</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" regular>H2 Regular</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" regular>H3 Regular</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" regular>H4 Regular</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" regular>H5 Regular</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" regular>H6 Regular</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>dark</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" dark>H1 Dark</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" dark>H2 Dark</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" dark>H3 Dark</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" dark>H4 Dark</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" dark>H5 Dark</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" dark>H6 Dark</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>errorColor</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" errorColor>H1 Error Color</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" errorColor>H2 Error Color</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" errorColor>H3 Error Color</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" errorColor>H4 Error Color</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" errorColor>H5 Error Color</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" errorColor>H6 Error Color</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}> link</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" disabled>H1 Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" disabled>H2 Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" disabled>H3 Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" disabled>H4 Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" disabled>H5 Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" disabled>H6 Disabled</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>link</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" link onClick={() => alert('link clicked')}>H1 Link</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" link onClick={() => alert('link clicked')}>H2 Link</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" link onClick={() => alert('link clicked')}>H3 Link</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" link onClick={() => alert('link clicked')}>H4 Link</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" link onClick={() => alert('link clicked')}>H5 Link</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" link onClick={() => alert('link clicked')}>H6 Link</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{flex:1}}>link disabled</Col>
            <Col style={{flex:1}}><LabelHeading variant="h1" disabled link onClick={() => alert('link clicked')}>H1 Link Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h2" disabled link onClick={() => alert('link clicked')}>H2 Link Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h3" disabled link onClick={() => alert('link clicked')}>H3 Link Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h4" disabled link onClick={() => alert('link clicked')}>H4 Link Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h5" disabled link onClick={() => alert('link clicked')}>H5 Link Disabled</LabelHeading></Col>
            <Col style={{flex:1}}><LabelHeading variant="h6" disabled link onClick={() => alert('link clicked')}>H6 Link Disabled</LabelHeading></Col>
          </Row>
        </TableRows>
      </Fieldset>


      <Row>
        <Input
          textarea
          //minRows={5}
          charCount={10}
          name="subject"
          label="Char Count"
        />

        {/* <Input
          name="subject"
          label="Subject"
          placeholder="Enter subject"
          info="header1|body1"
        /> */}
        <Input charCount={10} name="body" label="Body" />
      </Row>
      <Row>
        <Input
          name="names"
          label="Names (checkbox)"
          optionsCheckbox={optionDefault.task.names}
          info="header1|body1"
        //error={{ message: "Some error" }}
        />
        <Input
          size={{ xs: 6 }}
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={optionDefault.task.names}
        />
      </Row>
      <Row>
        <Input
          name="status"
          label="Status (select)"
          select
          options={optionDefault.task.status}
          //          placeholder="Select a status" 
          info="header2|body2"
        />
        <Input
          name="result"
          label="Result (autocomplete)"
          options={optionDefault.task.result}
          info="header3|body3"
        />
      </Row>
      <Row>
        <h3>Masked Input Examples</h3>
      </Row>
      <Row>
        <h4>Date Mask Examples</h4>
      </Row>
      <Row>
        <Input
          name="dob"
          label="Date of Birth (MM/DD/YYYY)"
          mask={inputMask.date}
          info="Enter your date of birth in MM/DD/YYYY format"
          readOnly
        />
        <Input
          name="dobEmpty"
          label="Date of Birth (Empty)"
          mask={inputMask.date}
          info="Empty date field with MM/DD/YYYY format"
        />
        <Input
          datepicker
          name="dob2"
          label="Date of Birth (Datepicker)"
          info="Empty date field with MM/DD/YYYY format"
        />
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
        <Col size={6}>
          <h4>SSN Label Mask (Children)</h4>
          <LabelMask mask={inputMask.ssn}>123456789</LabelMask>
        </Col>
        <Col size={6}>
          <h4>SSN Label Mask (Text Prop)</h4>
          <LabelMask mask={inputMask.ssn} text="123456789" />
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>Phone Number Label Mask</h4>
          <LabelMask mask={inputMask.phone}>5551234567</LabelMask>
        </Col>
        <Col size={6}>
          <h4>License Plate Label Mask</h4>
          <LabelMask mask={inputMask.licensePlate}>ABC1234</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>Partial Mask (Last 4 digits)</h4>
          <LabelMask mask={inputMask.ssn} showLast={4}>123456789</LabelMask>
        </Col>
        <Col size={6}>
          <h4>Persistent (Always Visible)</h4>
          <LabelMask mask={inputMask.ssn} persistent>123456789</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>With Label Heading Variant (h1)</h4>
          <LabelMask mask={inputMask.ssn} variant="h1">123456789</LabelMask>
        </Col>
        <Col size={6}>
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

export const schemaDefault = yup.object().shape({
  subject: yup.string().optional(),
  body: yup.string().optional(),
});

export const optionDefault = {
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

export const itemDefault = {
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
  // Sample data for masked inputs
  ssn: "123223234",
  tin: "987654321",
  phone: "5551234567",
  phoneExt: "5551234567",
  creditCard: "1234567890123456",
  creditCardExpiry: "1225",
  zipCode: "12345",
  zipCodePlus4: "123456789",
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
  // Sample data for DateMask examples
  dob: "2025-07-26",
  dob2: "2025-07-26",
  dobEmpty: "",
  // Sample data for password fields
  password: "",
  confirmPassword: "",
  ssn2: "",
};