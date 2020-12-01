import React from 'react';
// nodejs library that concatenates classes
// import classNames from "classnames";
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


import {useSelector} from 'react-redux'


let style = {
    ...imagesStyles,
    ...styles,
    cardTitle,
}

const useStyles = makeStyles(style);

const Menu = (props) => {
    const classes = useStyles();
    const {subCat,img} = useSelector((state) => {
        return {
            subCat:state.subCat,
            img:state.img
        }
    })
    console.log('subCat',subCat,"img",img)
    const filterCat =Object.values(subCat).filter(data=>data.setCategory === props.Cat)
    console.log('filter',filterCat,"props",props.Cat)
    return (
        <GridContainer>
        {
            filterCat.map((data,i)=>
           <GridItem xs={12} sm={12} md={4} key={data+i}>
                <Card >
                <img
                    style={{ width: "100%", display: "block" }}
                    className={classes.imgCardTop}
                    src={Object.values(img).filter(imgData=> imgData.name ===data.itemId )[0].url}
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>{data.itemName}</h4>
                    <p>{data.price}</p>
                    <Button color="primary">Do something</Button>
                </CardBody>
            </Card>
        </GridItem>
            )
        }
            
          

        </GridContainer>
    )
}

export default Menu
