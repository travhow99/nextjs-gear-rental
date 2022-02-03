import { Card, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React, { Component } from 'react';
import useStyles from '../../utils/styles';
import Layout from '../layout/Layout';
import SideNav from '../layout/SideNav';

export default function AdminContainer({ title, children }) {
  const classes = useStyles();
  const links = [
    {
      href: '/admin',
      selected: title === 'Admin',
      title: 'Admin',
    },
    {
      href: '/admin/sales',
      selected: title === 'Sales',
      title: 'Sales',
    },
    {
      href: '/admin/inventory',
      selected: title === 'Inventory',
      title: 'Inventory',
    },
    {
      href: '/admin/inbox',
      selected: title === 'Inbox',
      title: 'Inbox',
    },
  ];

  return (
    <Layout title={title}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <SideNav items={links} />
        </Grid>
        <Grid item md={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Layout>
  );
}
