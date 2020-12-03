import React from 'react';
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import ModalStyle from 'assets/jss/material-kit-react/modalStyle.js';
import { cardTitle } from "assets/jss/material-kit-react.js";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import Close from "@material-ui/icons/Close";


import {useSelector} from 'react-redux';
import CustomInput from "components/CustomInput/CustomInput.js"
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";


let style = {
    ...imagesStyles,
    ...styles,
    cardTitle,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
const useStyles = makeStyles(style);

const Menu = (props) => {
    const classes = useStyles();
    const [primaryColor,setPrimaryColor] =React.useState('')
    const [secondaryColor,setSecondaryColor] =React.useState('')
    const [open, setOpen] = React.useState(false);
    const [itemData,setItemData] =React.useState([])
    const handleOpen = (data) => {
     setOpen(true);
     setItemData(data)
    };

    const handleClose = () => {
        setOpen(false);
        setItemData([])
     };
  
    const {subCat,img} = useSelector((state) => {
        return {
            subCat:state.subCat,
            img:state.img
        }
    })
    const onSubmit =()=>{

        const obj = {
            itemId:itemData.itemId,
            itemName:itemData.itemName,
            primaryColor,
            secondaryColor,
            itemPrice:itemData.price,
        }
        console.log(obj);
        setOpen(false);
        setItemData([]);
        setSecondaryColor('')
        setPrimaryColor('')

    }

    const filterCat =Object.values(subCat).filter(data=>data.setCategory === props.Cat)

    return (
        <>
        <GridContainer>
        {
            filterCat.map((data,i)=>
            <>
           <GridItem xs={12} sm={12} md={4} key={data.itemId+i}>
                <Card key={data+i} >
                <img
                    style={{ width: "100%", display: "block" }}
                    className={classes.imgCardTop}
                    src={Object.values(img).filter(imgData=> imgData.name ===data.itemId )[0].url}
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>{data.itemName}</h4>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><p>Rs.{data.price}/-</p>
                    <Button color="info" onClick={()=>handleOpen(data)}>Do something</Button></div>
                </CardBody>
            </Card>
           
        </GridItem>
        
        </>
            )
        }
            

        </GridContainer>
        <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => handleClose()}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>{itemData.itemName}</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
         <CustomInput
                labelText="Type Your Primary Color Name"
                id="Primary"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    endAdornment: (<InputAdornment position="end"><People/></InputAdornment>),
                    value:primaryColor,
                    onChange:(e)=>setPrimaryColor(e.target.value)
                }}
            />
            <CustomInput
                labelText="Type Your Secondary Color Name"
                id="Secondary"
                
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    endAdornment: (<InputAdornment position="end"><People/></InputAdornment>),
                    value:secondaryColor,
                    onChange:(e)=>setSecondaryColor(e.target.value)
                }}
            />
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => onSubmit()} color="success">
           Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default Menu
