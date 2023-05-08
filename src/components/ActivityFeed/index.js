import React, { useEffect, useRef} from "react";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText, ListItemAvatar, Divider, Grow, Link, Typography  } from "@mui/material";

export const Message = (props) => {
  const messagesEndRef = useRef(null);
  const { message,  location, displayName, action, url} = props;

  useEffect(()=>{
    messagesEndRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: "nearest",
      inline: "start", 
    });
  }, [])
  return (
    <React.Fragment>
      <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
        >
      <List className="root" ref={messagesEndRef}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar className="avatar">
              { action === 'edit' ? <EditIcon fontSize="small"/> : <PermIdentityIcon fontSize="small"/>}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">{displayName || "Anonymous"} <sup>[{action}]</sup></Typography>}
            secondary={
              <Typography variant="caption" className="summary">
                {action} on Page: {url ? <Link href={url} target="_blank">{location}</Link> : location}
                <br />
                Summary: {message || 'None'}
              </Typography>
            }
          />
        </ListItem>
        <Divider variant="middle"/>
    </List>
    </Grow>
    </React.Fragment>
  );
};

export default Message