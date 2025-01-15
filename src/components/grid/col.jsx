import { Grid2 as Grid } from "@mui/material";
import { Item, ItemNoPadding } from "./item";

const defaultXs = 3;

export const Col = (props) => {
  const { children, ...rest } = props;
  return (
    <Grid xs={props.xs || defaultXs} {...rest}>
      <ItemNoPadding>{children}</ItemNoPadding>
    </Grid>
  );
};

export const ColPadded = (props) => {
  const { children, ...rest } = props;
  return (
    <Grid xs={props.xs || defaultXs} {...rest}>
      <Item>{children}</Item>
    </Grid>
  );
};
