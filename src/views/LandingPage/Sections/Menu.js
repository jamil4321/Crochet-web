import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

import team1 from "assets/img/mittens.jpg";
import team2 from "assets/img/Owl Pouch1.jpg";
import team3 from "assets/img/cupcake.jpg";



let style = {
    ...imagesStyles,
    ...styles,
    cardTitle,
}

const useStyles = makeStyles(styles);

const Menu = () => {
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card >
                    <img
                        style={{ width: "100%", display: "block" }}
                        className={classes.imgCardTop}
                        src={team2}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>Card title</h4>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button color="primary">Do something</Button>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card >
                    <img
                        style={{ width: "100%", display: "block" }}
                        className={classes.imgCardTop}
                        src={team3}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>Card title</h4>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button color="primary">Do something</Button>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <img
                        style={{ width: "100%", display: "block" }}
                        className={classes.imgCardTop}
                        src={team1}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>Card title</h4>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button color="primary">Do something</Button>
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    )
}

export default Menu
