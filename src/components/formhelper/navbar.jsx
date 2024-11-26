import {
  Toolbar, 
  Box, 
  Typography
} from "@mui/material";

export const Navbar =(props) => {
  const {alignRight, style}=props;

  return (
    <>
      <Box xs={{flexGrow:1}} style={style||{}}>
        <Toolbar
          disableGutters
          variant="dense"
          style={{
            //backgroundColor: color.primary.white,
            minHeight:"35px",
            width:"96%",
            position: "fixed",


          }}
        >
meh
        </Toolbar>
      </Box>

    </>
  )


}
