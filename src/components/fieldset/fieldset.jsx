import { Box } from "@mui/material";

export const Fieldset = ({ children, legend, ...props }) => {
    return (
        <Box
            component="fieldset"
            sx={{
                boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
                borderRadius: '8px',
                border: "1px #E0E0E0",
                padding: "40px",
            }}
            {...props}
        >
            {legend && (
                <legend>
                    {legend}
                </legend>
            )}
            {children}
        </Box>
    );
}
