import { TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { InfoIcon } from "./info-icon";
import {
  useController,
  //useForm
} from "react-hook-form";
import { ColPadded } from "@/components/grid";
//import { BootstrapTooltip } from "./infotooltip";
import { Help /*HelpOutline*/ as IconMui } from "@mui/icons-material";
/*
to switch to bootstrap style:
https ://mui.com/material-ui/react-text-field/
“using the styled API react-bootstrap"
*/
export const TextField = (props) => {
  const placeholder = (e) => {
    return;
  };
  const onBlur = props.onBlur || placeholder;
  const onChange = props.onChange || placeholder;
  const onKeyDown = props.onKeyDown || placeholder;
  const unbound = props.unbound === "true" ? true : false;
  const {
    field,
    fieldState: { error /* invalid, isTouched, isDirty, */ },
    //formState: { touchedFields, dirtyFields }
  } = useController({
    ...props,
  });
  let valueProp = {};
  if (!props.defaultvalue) {
    if (!unbound) {
      valueProp = {
        value: field.value || "",
      };
    }
  }

  // const helpIconStyle = {
  //   marginRight: "-7px",
  //   marginTop: "3.5px",
  //   fontSize: "larger",
  //   color: "#2b72b9",
  // };

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        id={field.name}
        name={field.name}
        label={props.label || ""}
        inputRef={field.ref}
        onBlur={(e) => {
          field.onBlur(e.target.value);
          onBlur(e);
        }}
        onChange={(e) => {
          field.onChange(e.target.value);
          onChange(e);
        }}
        onKeyDown={(e) => {
          field.onKeyDown(e.target.value);
          onKeyDown(e);
        }}
        {...valueProp}
        fullWidth
        // InputProps={{
        //   endAdornment: props.helpInfo ? (
        //     <IconMui
        //       fontSize="small"
        //       onClick={props.handleHelpToggle}
        //       sx={helpIconStyle}
        //       className="help-icon"
        //     />
        //   ) : (
        //     <></>
        //   ),
        //}}
        {...{error: !!error || undefined,helperText:error?.message}}
        {...cleanParentProps(props)}
      />
      {props.info && InfoIcon(`${field.id}Info`,props.info)}
    </ColPadded>
  );
};
