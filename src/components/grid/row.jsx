import { Grid } from "@mui/material";

export const Row = (props) => {
  const { children, columns, ...rest } = props;

  return (
    <Grid
      container
      spacing={2}
      columns={columns || { xs: 2, sm: 4, md: 12 }}
      sx={()=>({
        ".table-using-rows &":{
          mt:1,
          mb:1,
        },
        //line above first row
        ".table-using-rows & + &":{
          borderTop:'1px solid #d5d5d5',
        },
        //lines between rows
        ".table-using-rows & + &":{
          borderTop: '1px solid #d5d5d5',
        },
        //line under last row
        ".table-using-rows &:last-of-type":{
          borderBottom: '1px solid #d5d5d5',
          paddingBottom: '6px',
        }
      })}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export const TableRows =({children})=>(
  <div className="table-using-rows">
    {children}
  </div>
)

Row.displayName = "Row";
export default Row;

