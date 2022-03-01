import { Card } from '@material-ui/core';
import {
  Button,
  List,
  ListItem,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import DateHelper from '../../utils/DateHelper';
import useStyles from '../../utils/styles';

export default function BlockOutForm({ productId, blockOuts }) {
  const [adding, setAdding] = useState(false);
  const [dateIn, setDateIn] = useState('');
  const [dateOut, setDateOut] = useState('');
  const classes = useStyles();

  console.log('bo form', blockOuts, productId, dateIn, dateOut);

  const uploadHandler = async (e) => {
    try {
      const { data } = await axios.get('/api/blockOuts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('product img err', error);
    }
  };

  const addBlockOut = () => {
    console.log('addinb BO');
    setAdding(true);
  };

  const addBlockOutHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        dateIn,
        dateOut,
        product: productId,
      };

      const { data } = await axios.post('/api/blockOuts', formData);
    } catch (error) {
      console.log('product img err', error);
    }
  };

  return (
    <Card className={classes.section}>
      <List>
        <ListItem>
          <Typography component="p">BlockOuts</Typography>
        </ListItem>

        {adding ? (
          <form onSubmit={addBlockOutHandler} className={classes.form}>
            <ListItem>New BlockOut</ListItem>
            <ListItem>
              <TextField
                type={'datetime-local'}
                value={dateIn}
                onChange={(e) => setDateIn(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                type={'datetime-local'}
                value={dateOut}
                onChange={(e) => setDateOut(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Add
              </Button>
            </ListItem>
          </form>
        ) : (
          <>
            <ListItem>
              <Paper
                className={classes.paper}
                elevation={3}
                onClick={addBlockOut}
              >
                + Add BlockOut
              </Paper>
            </ListItem>
            <ListItem>
              {blockOuts &&
                blockOuts.length > 0 &&
                blockOuts.map((bo) => (
                  <Paper key={bo._id} className={classes.paper} elevation={3}>
                    {/**
                     *
                     * @todo Display hours & minutes as well
                     *
                     */}
                    {DateHelper.timestampToDate(bo.dateOut)} -{' '}
                    {DateHelper.timestampToDate(bo.dateIn)}
                  </Paper>
                ))}
            </ListItem>
          </>
        )}
      </List>
    </Card>
  );
}
