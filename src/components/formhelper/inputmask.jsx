import { cleanParentProps, colProps } from "./helper";
import {useFormField} from "./form-provider";
import { Col } from "components";


/*esline react/prop-types: 0 */
export const InputMask = (props) => {
  const {label} = props;
  const { field, error } = useFormField(props);
  return (
    <Col {...colProps(props)}>
      {label && <label>{label}</label>}<br/>
      <input {...cleanParentProps(props)} {...field}/><br/>
      <label className="validation-error-message">
        not implemented
        </label>
      {error && (
        <label className="validation-error-message">
          <br />{error.message}
        </label>
      )}
      </Col>
  );
}

InputMask.displayName = 'InputMask';