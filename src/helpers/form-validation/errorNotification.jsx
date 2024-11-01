import { toast } from "react-toastify";
import {isEmpty}from "lodash";

const toastId = "idFormValidation";

export const errorNotification = (errors) => {
  if (isEmpty(errors)) {
    return {};
  }

  let i = 0;
  const messages = Object.keys(errors).map((e) =>
      <span key={++i}>
        {errors[e].message}
        <br />
      </span>
  );

  if (toast.isActive(toastId)) {
    toast.dismiss(toastId);
  }

  if (!isEmpty(messages)) {
    toast.warn(<div>{messages}</div>, {
      //autoClose: false,
      toastId,
    });
  }

};

export default errorNotification;
