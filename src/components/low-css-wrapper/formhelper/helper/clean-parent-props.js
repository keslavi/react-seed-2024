export const cleanParentProps = (props) => {
  const check =
    "value,control,useController,tooltipId,checkbox,datepicker,viewMode,readOnly,maxLength";

  //const ret = { Inputprops: {}, inputProps: {} };
  const ret = {inputprops:{}};
  const propKeys = Object.keys(props);

  propKeys.forEach((key) => {
    if (!check.includes(key)) {
      ret[key] = props[key];
    }
  });

  if (propKeys.includes("maxLength")) {
    ret.inputprops["maxLength"] = props.maxLength;
  }

  ret["disabled"] = props.viewMode || props.readOnly;

  return ret;
};