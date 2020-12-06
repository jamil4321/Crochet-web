import React from "react";
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

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import Close from "@material-ui/icons/Close";

import { useSelector,useDispatch } from "react-redux";
import CustomInput from "components/CustomInput/CustomInput.js";


let style = {
  ...imagesStyles,
  ...styles,
  cardTitle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(style);

const Menu = (props) => {
  const classes = useStyles();
  const [primaryColor, setPrimaryColor] = React.useState("");
  const [secondaryColor, setSecondaryColor] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [itemData, setItemData] = React.useState([]);
  const [srcImg, setImg] = React.useState([]);
  const [qty,setQty] = React.useState(1)
  const handleOpen = (data, img) => {
    setOpen(true);
    setItemData(data);
    setImg(img);
  };

  const handleClose = () => {
    setOpen(false);
    setItemData([]);
    setImg([]);
  };

  const { subCat, img } = useSelector((state) => {
    return {
      subCat: state.subCat,
      img: state.img,
    };
  });
  const dispatch= useDispatch();
  const onSubmit = () => {
    const obj = {
      itemId: itemData.itemId,
      itemName: itemData.itemName,
      primaryColor,
      secondaryColor,
      itemPrice: itemData.price,
      qty
    };
    dispatch({type:'ADDTOCART',payload:obj})

    setOpen(false);
    setItemData([]);
    setSecondaryColor("");
    setPrimaryColor("");
    setQty(1)
  };

  const filterCat = Object.values(subCat).filter(
    (data) => data.setCategory === props.Cat
  );

  return (
    <>
      <GridContainer>
        {filterCat.map((data, i) => {
          let imgSrc = Object.values(img).filter(
            (imgData) => imgData.name === data.itemId
          )[0];
          return (
            <>
              <GridItem xs={12} sm={12} md={4} key={data.itemId + i}>
                <Card key={data + i}>
                  {!!imgSrc && (
                    <img
                      style={{ maxHeight: "350px", display: "block" }}
                      className={classes.imgCardTop}
                      src={imgSrc.url}
                      alt="Card-img-cap"
                    />
                  )}
                  <CardBody>
                    <h4 className={classes.cardTitle}>{data.itemName}</h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Rs.{data.price}/-</p>
                      <Button
                        color="info"
                        onClick={() => handleOpen(data, imgSrc)}
                      >
                        Add to Bucket
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </>
          );
        })}
      </GridContainer>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
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
       <div style={{display:'flex' ,justifyContent:'space-around'}}> <h4 className={classes.modalTitle}>{itemData.itemName}</h4>
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => handleClose()}
          >
            <Close className={classes.modalClose} />
          </IconButton></div>
          
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <div style={{ display: "flex"}}>
            <div>
              {!!srcImg &&(<img
                src={srcImg.url}
                alt={srcImg.name}
                style={{
                  height: 200,
                  width: 200,
                }}
              />)}
            </div>
            <div style={{marginLeft:10}}>
              <CustomInput
                labelText="Type Your Primary Color Name"
                id="Primary"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: primaryColor,
                  onChange: (e) => setPrimaryColor(e.target.value),
                }}
              />
              <CustomInput
                labelText="Type Your Secondary Color Name"
                id="Secondary"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  
                  value: secondaryColor,
                  onChange: (e) => setSecondaryColor(e.target.value),
                }}
              />
              <CustomInput
                labelText="How much Quantity you want?"
                id="Qty"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type:'number',
                  value: qty,
                  onChange: (e) => setQty(e.target.value),
                }}
              />
            </div>
          </div>
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
  );
};

export default Menu;
