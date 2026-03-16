import { Box } from "@mui/material";
import { color } from "@/theme-material";
export const Fieldset = ({ children, legend, sx, ...props }) => {
    return (
        <Box
            component="fieldset"
            sx={{
                boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: "1px solid ${color.gray300}",
                padding: "32px",
                marginBottom: "24px",
                '& .MuiButton-root':{
                    fontSize: '1.25rem !important', 
                },
                '& .MuiButton-root.Mui-disabled':{
                    fontSize: '1.25rem !important', 
                },
                ...sx,
            }}
            {...props}
        >
            {legend && (<legend>{legend}</legend>)}
            {children}
        </Box>
    );
};
