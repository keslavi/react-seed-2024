//import { TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";

import { Col } from "components";

export const InputMask = (props) => {




  const { field, error } = useFormField(props);
  return (
    <Col {...colProps(props)}>
      {label && <label>{label}</label>}
      <br />
      <input {...cleanParentProps(props)} {...field}/>
      <label className="validation-error-message">
        formhelper/InputMask not fully implemented
      </label>
      {error && (
        <label className="validation-error-message">
          <br />
          {error.message}
        </label>
      )}
    </Col>
  );
};
