import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";


import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import {useSelector} from 'react-redux'

import Menu from './Menu'


const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  const {cat,subCat} = useSelector((state) => {
    return {
        cat: state.cat,
        subCat:state.subCat
    }
})
  return (
    <div className={classes.section}>
      {/* <div className={classes.container}>
        <div id="nav-tabs">*/}
      <h2 style={{ textAlign: 'center' }}>Our Products</h2>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="info"
            tabs={
              cat.map((data,i)=>{
                const dataReturn = {
                                tabName: data,
                                tabContent: (<Menu Cat={data} key={i} />)

                            }
                  return dataReturn
              })
              
            //   [
            //   {
            //     tabName: "Profile",
            //     tabContent: (
            //       <Menu />
            //     )
            //   },
            //   {
            //     tabName: "Messages",
            //     tabContent: (
            //       <Menu />
            //     )
            //   },
            //   {
            //     tabName: "Settings",
            //     tabContent: (
            //       <Menu />
            //     )
            //   }
            // ]
            }
          />
        </GridItem>
      </GridContainer>
    </div>
    //   </div>
    // </div>
  );
}
