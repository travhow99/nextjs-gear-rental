import {
  Card,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Link from 'next/link';
import useStyles from '../../utils/styles';

export default function SideNav({ items }) {
  const classes = useStyles();

  return (
    <Card className={classes.section}>
      <List>
        {items.length ? (
          items.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <ListItem selected={item.selected} button component="a">
                <ListItemText primary={item.title}></ListItemText>
              </ListItem>
            </Link>
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
    </Card>
  );
}
