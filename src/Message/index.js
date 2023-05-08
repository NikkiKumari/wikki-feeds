import React, { useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText, ListItemAvatar, Divider, Grow, Link, Typography  } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    width: 35,
    height: 35
  },
  summary: {
    color: '#999'
  }
}));



export const Message = (props) => {
  const messagesEndRef = useRef(null);
  const { message,  location, displayName, action, url} = props;
  const classes = useStyles();

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
      <List className={classes.root} ref={messagesEndRef}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              { action === 'edit' ? <EditIcon fontSize="small"/> : <PermIdentityIcon fontSize="small"/>}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle2">{displayName || "Anonymous"} <sup>[{action}]</sup></Typography>}
            secondary={
              <Typography variant="caption" className={classes.summary}>
                {action} on Page: {url ? <Link href={url}>{location}</Link> : location}
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