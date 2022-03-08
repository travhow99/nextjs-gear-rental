import { Card, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React, { Component } from 'react';
import useStyles from '../../utils/styles';
import Layout from '../layout/Layout';
import SideNav from '../layout/SideNav';

export default function SellerContainer({ title, children }) {
  const classes = useStyles();
  const links = [
    {
      href: '/seller',
      selected: title === 'Seller',
      title: 'Seller',
    },
    {
      href: '/seller/sales',
      selected: title === 'Sales',
      title: 'Sales',
    },
    {
      href: '/seller/products',
      selected: title === 'Products',
      title: 'Products',
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
