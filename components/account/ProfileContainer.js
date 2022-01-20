import { Card, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React, { Component } from 'react';
import useStyles from '../../utils/styles';
import Layout from '../layout/Layout';

export default function ProfileContainer({ title, children }) {
  const classes = useStyles();

  return (
    <Layout title={title}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <Link href="/account" passHref>
                <ListItem selected={title === 'Account'} button component="a">
                  <ListItemText primary="Account"></ListItemText>
                </ListItem>
              </Link>
              <Link href="/account/profile" passHref>
                <ListItem selected={title === 'Profile'} button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </Link>
              <Link href="/account/orders" passHref>
                <ListItem selected={title === 'Orders'} button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </Link>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Layout>
  );
}
