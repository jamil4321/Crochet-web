/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// @material-ui/icons

import Button from "components/CustomButtons/Button.js";
import Badge from '@material-ui/core/Badge';
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {useSelector} from 'react-redux'

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const {cart}= useSelector((state) => {
    return {
      cart: state.cart,
    };
  })
  console.log('cart',cart)
  console.log('cartLength',cart.length)
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          Products
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
          target="_blank"
          className={classes.navLink}
        >
      <Badge badgeContent={cart.length} color={cart.length > 0 ? "primary":"error"}>
          <ShoppingBasketIcon />
          </Badge>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>

      </ListItem>
    </List>
  );
}
