import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Our Story</h2>
          <h5 className={classes.description}>
            It all started when I took inspiration from my mom who had exemplary crochet skills and
            decided to take classes to learn these skills for myself as well. I started doing crochet
            work for my family and relatives who would appreciate me by calling me ‘very talented’ and
            then they would all request me to make them different items for free. That’s when I realized
            that women in our society should not just be labeled ‘talented’ for their skills but rather
            they should be given opportunities to grow economically with their talents. Their special skills
            should never be taken for granted! It is every woman’s right to be able to fulfill her needs
            independently. So here I am with Crochet Diaries! A venture created to motivate all other women
            who might not be able to realize the significance of their skills. If I can! Then I am all you
            beautiful women can too! Much love and power.
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
