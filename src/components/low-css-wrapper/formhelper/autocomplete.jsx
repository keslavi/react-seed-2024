import { useEffect } from "react";
import { Input } from "./-input";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
export const AutoComplete = (props) => {
  useEffect(() => {
    if (isEmpty(props.options)) {
      toast.error(
        `!Dev: ${props.name} field: Autocomplete expects options:[{key,text}]`
      );
    }
  }, []);
  return <Input {...props} />;
};
