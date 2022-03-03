import { List, ListItem } from '@material-ui/core';
import { useState } from 'react';

/**
 * @todo WIP
 */
const BaseForm = (props) => {
  const [formData, setFormData] = useState({});
  const classes = useStyles();

  return (
    <form onSubmit={props.submitHandler} className={classes.form}>
      <List>
        <ListItem></ListItem>
      </List>
    </form>
  );
};

export default BaseForm;
