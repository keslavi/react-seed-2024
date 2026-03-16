import { useFieldArray } from "react-hook-form";
import { useFormContext } from "./form-provider";
import { Col } from "../grid/col";
import { InfoPopover } from "../info-popover";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

/**
 * ArrayInput - Dynamic array input component with add/remove functionality
 * @param {string} name - Field name for react-hook-form
 * @param {string} label - Label for the field
 * @param {string} placeholder - Placeholder text
 * @param {string} info - Info popover text (supports "header|body" format)
 * @param {number} size - Column size (default: 12)
 */
export const ArrayInput = (props) => {
  const {
    name,
    label,
    placeholder = "",
    info,
    size = 12,
    disabled = false,
  } = props;

  const { formMethods } = useFormContext();
  const { control, formState: { errors } } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const error = errors?.[name];
  const hasError = !!error;

  const handleAdd = () => {
    append("");
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Col size={size}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {label && (
            <label style={{ marginRight: "8px", fontWeight: "500" }}>
              {label}
            </label>
          )}
          {info && <InfoPopover info={info} />}
          <Button
            type="button"
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={disabled}
            sx={{ ml: "auto" }}
          >
            Add
          </Button>
        </Box>

        {fields.length === 0 && (
          <Box sx={{ fontStyle: "italic", color: "text.secondary", p: 1 }}>
            No items added yet. Click "Add" to add a new item.
          </Box>
        )}

        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 1,
            }}
          >
            <TextField
              {...control.register(`${name}.${index}`)}
              placeholder={placeholder}
              fullWidth
              size="small"
              disabled={disabled}
              error={hasError && !!errors?.[name]?.[index]}
              helperText={errors?.[name]?.[index]?.message}
            />
            <IconButton
              type="button"
              color="error"
              onClick={() => handleRemove(index)}
              disabled={disabled}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        {hasError && typeof error.message === "string" && (
          <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
            {error.message}
          </Box>
        )}
      </Box>
    </Col>
  );
};

ArrayInput.displayName = 'ArrayInput';
