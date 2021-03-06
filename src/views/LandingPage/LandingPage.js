import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import OurVision from "./Sections/OurVision.js";
import NavigationTAb from './Sections/SectionTabs.js';
import firebase from 'Firebase.js'
import CircularProgress from '@material-ui/core/CircularProgress';


import { useDispatch, useSelector } from 'react-redux';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const { isDataLoaded } = useSelector((state) => {
    return {
      isDataLoaded: state.isDataLoaded,
    };
  });
  const dispatch = useDispatch();
  React.useEffect(() => {

    firebase.database().ref('subCat').on('value', snapshot => {
      let data = snapshot.val();
      dispatch({ type: 'DATAFROMFIREBASE', payload: data })
    })
    firebase.database().ref('cat').on('value', snapshot => {
      let data = snapshot.val();
      dispatch({ type: 'DATAFROMFIREBASECAT', payload: data })
    })
    firebase.storage().ref().child('/images/').listAll().then(data => {
      let image = []
      data.items.forEach(async imgRef => {
        await imgRef.getDownloadURL().then(async url => {
          let imgUrl = {
            name: imgRef.name,
            url: url
          }
          await image.push(imgUrl)
        })
      })
      dispatch({ type: 'DATAFROMFIREBASEIMAGES', payload: image })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isDataLoaded ?

        <div>
          <Header
            color="transparent"
            routes={dashboardRoutes}
            brand="Material Kit React"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 200,
              color: "info"
            }}
            {...rest}
          />
          <Parallax filter image={require("assets/img/homepage-new.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.brand}>
                    <h1 className={classes.title}>Crochet Diaries</h1>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div id="#About" className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <TeamSection />
            </div>
          </div>

          <OurVision />
          <NavigationTAb id="#Products" />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <WorkSection />
            </div>
          </div>
          <Footer />
        </div>

        : <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}><CircularProgress size={100} /></div>
      }</>
  );
}
