import { useState } from "react";
import { Popover } from "@mui/material";
import IconHelpRounded from '@mui/icons-material/HelpRounded';
import { color } from "@/theme-material";


const InfoPopover = ({ info }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconHelpRounded
        aria-describedby={id}
        onClick={onClick}
        sx={{ color: color.primary.blue, cursor: 'pointer', fontSize: '1.2rem', verticalAlign: 'middle' }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>
          {info?.header && <p>{info.header}</p>}
          {info?.content && (
            <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
              {info.content.map((item, index) => (
                <li key={index} style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-20px' }}>.</span>
                  {item}
                </li>
              ))}
            </ul>
          )

          }
        </div>
      </Popover>
    </div>
  )
}
export { InfoPopover };



