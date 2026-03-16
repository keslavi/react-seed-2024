import { useState, isValidElement } from "react";
import {
  IconButton,
  Popover,
  Typography,
} from "@mui/material";

import IconHelpRounded from '@mui/icons-material/HelpRounded';
import IconClear from '@mui/icons-material/Clear';
import IconHelp from '@mui/icons-material/Help';
import { color } from "@/theme-material";

export const Info = ({ id, info }) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  let infoHeader = null;
  let infoSubject = info;

  const tooltipInfoStyle = () => {
    infoHeader = info.label;
    infoSubject = (<>
      {info.message && (<Typography variant="caption">
        {info.message}
      </Typography>)}
      {info.content && isValidElement(info.content) && info.content}
      {info.messageList && (<>
        <div>
          <ul>
            {info.messageList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </>)}
    </>)
  };

  if (info && typeof info == 'string' && info.indexOf("|") > 0) {
    const arInfo = info.split("|");
    infoHeader = arInfo[0];
    infoSubject = arInfo[1];
  } else if (isValidElement(info)) {
    tooltipInfoStyle(info)
  }

  const onClickIcon = e => {
    setAnchor(e.currentTarget);
  };

  const onClosePopover = e => {
    setAnchor(null);
  };

  return (
    <div style={{
      position: 'absolute',
      right: 10,
      top: 5,
      zIndex: 1
    }}>
      <IconHelpRounded
        data-testid="IconHelpRounded"
        sx={{
          color: color.primary.blue,
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}
        onClick={onClickIcon}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={onClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: "400px"
          }
        }}
      >
        {infoHeader &&
          <div>
            <b>{infoHeader}</b>
          </div>
        }
        {infoSubject && (isValidElement(infoSubject)
        ? infoSubject
        : String(infoSubject)
        )}
      </Popover>
    </div>
  );
};

export const InfoIcon = (props) => {
  const { id, info, label } = props;
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  let infoHeader = null;
  let infoSubject = info;

  if (typeof info === 'string') {
    if (info.indexOf("|") > 0) {
      const arInfo = info.split("|");
      infoHeader = arInfo[0];
      infoSubject = arInfo[1];
    }
  }

  const onTogglePopover = (e) => {
    const el = isEmpty(anchor) ? e.currentTarget : null;
    setAnchor(e.currentTarget);
  };

  const onClosePopover = (e) => {
    setAnchor(null);
  };

  const ret = (
    <>
      <IconHelp
        color="primary"
        fontSize="small"
        onClick={onTogglePopover}
        sx={{
          color: color.cobe1.blue,
          position: 'absolute',
          top: '-3px',
          right: 0,
          transform: 'translate(-10%,50%)',
          cursor: "pointer"
        }}
      />

      {label}

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        aria-hidden="false"
        onClose={onClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{ style: { width: "400px" } }}
      >
        <IconButton edge="start" aria-label="close" onClick={onClosePopover} style={{ position: 'absolute', top: '5px', right: '5px' }}>
          <IconClear fontSize='small' className="clear-icon" />
        </IconButton>
        {infoHeader && (
          <Typography variant="h5" gutterBottom>
            {infoHeader}
          </Typography>
        )}
        {infoSubject}
      </Popover>
    </>
  );
  return ret;
};

Info.displayName = 'Info';

export default Info;

