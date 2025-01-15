import {color} from "@/theme-material";

import {
  AppBar,
  Toolbar,
} from '@mui/material';

export const BottomSticky = (props)=>{
  return (
    <AppBar 
      position="fixed"
      sx={{
        top:'auto',
        bottom:0,
        boxShadow:'none',
        zIndex:3000
      }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          sx={{
            px:2,
            boxShadow:"none",
            bgcolor:color.primary.white,
          }}
        >
          {props.children}
        </Toolbar>
      </AppBar>
  )
}