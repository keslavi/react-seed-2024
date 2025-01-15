import { useState } from "react";
import { isEmpty } from "lodash";
import { InputAdornment, Popover, Typography } from "@mui/material";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Help /*helpOutline*/ as IconMui } from "@mui/icons-material";
import { color } from "@/theme-material";
import { InsertCommentOutlined } from "@mui/icons-material";

export const InfoIcon = (id, info) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  let infoHeader = null;
  let infoSubject = info;

  if (info.indexOf("|") > 0) {
    const arInfo = info.split("|");
    infoHeader = arInfo[0];
    infoSubject = arInfo[1];
  }

  const onTogglePopover = (e) => {
    const el = isEmpty(anchor) ? e.currentTarget : null;
    setAnchor(e.currentTarget);
  };

  const onClosePopover = (e) => {
    setAnchor(null);
  };

  const ret = (
    <div style={{ position: "absolute", top: 12, right: 0 }}>
      <InputAdornment
        position="end"
        style={{
          position: "relative",
        }}
      >
        <IconMui
          color="primary"
          fontSize="small"
          onClick={onTogglePopover}
          sx={{
            color: color.primary.blue,
            cursor: "pointer",
          }}
        />
      </InputAdornment>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={onTogglePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: "400px",
          },
        }}
      >
        {infoHeader && (
          <Typography variant="h5" gutterBottom>
            {infoHeader}
          </Typography>
        )}
        {infoSubject}
      </Popover>
    </div>
  );
  return ret;
};
