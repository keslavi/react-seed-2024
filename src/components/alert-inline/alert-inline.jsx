import { Alert as MuiAlert, AlertTitle } from "@mui/material";
import { color } from "theme-material";

const themeColor = {
  success: "var(--toastify-color-success)",
  info: "var(--toastify-color-info)",
  warning: "var(--toastify-color-warning)",
  error: "var(--toastify-color-error)",
  banner: "#F2F8FC",
}

export const AlertInline = ({
  type = "info",
  variant = 'outlined',
  title = null,
  icon = null,
  children,
  message = "",
  ...props
}) => {

  const alertColor = themeColor[type] || themeColor.info;
  const content = children || message || "";
  const resolvedVariant = type === "banner" ? "contained" : variant;

  const sx = {
    border: `1px solid ${alertColor}`,
    //backgroundColor: isBanner ? themeColor.banner : "var(--color-white)",
    color: 'color: color.cobe1.black',
    svg: {
      color: alertColor, //icon color
    },
    ...props.sx,
  };

  return (
    <MuiAlert
      severity={type}
      variant={resolvedVariant}
      {...icon && {icon}}
      sx={sx}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {content}
    </MuiAlert>
  );
}
  

