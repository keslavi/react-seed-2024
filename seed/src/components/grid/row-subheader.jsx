import { color } from "@/theme-material";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";

export const RowSubheader = (props) => {
  const { leftcontent, rightcontent, children, backgroundColor, ...rest } = props;

  const leftcontent2 = props.leftcontent || props.children;
  const rightcontent2 = props.rightcontent || "";
  const backgroundColor2 = props.backgroundColor || color.secondary.blue300;
  const textColor2 = props.color || color.primary.white;

  // In MUI v7 Grid, use size prop instead of xs
  const leftSize = isEmpty(rightcontent) ? 12 : props.size || 10;
  const rightSize = 12 - leftSize;

  return (
    <Grid
      container
      sx={{
        height: "35px",
        backgroundColor: backgroundColor2,
        color: textColor2,
        fontSize: "1.2rem", // Fixed typo: fontsize -> fontSize
        padding: "3px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
      }}
      {...rest}
    >
      <Grid 
        container 
        item 
        size={leftSize} 
        justifyContent="flex-start" // Fixed: flex-begin -> flex-start
      >
        <div>{leftcontent2}</div>
      </Grid>
      {leftSize < 12 && (
        <Grid 
          container 
          item 
          size={rightSize} 
          justifyContent="flex-end"
        >
          <div>{rightcontent2}</div>
        </Grid>
      )}
    </Grid>
  );
};
