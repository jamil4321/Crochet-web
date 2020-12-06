import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const { cart } = useSelector((state) => {
    return {
      cart: state.cart,
    };
  });
  console.log(cart);
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="info" className={classes.cardHeader}>
                  <h4>Your Selected Items</h4>
                </CardHeader>
                <CardBody>
                  <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                      <div style={{ display: "flex",justifyContent:'space-around' }}>
                        <div>
                          <h3>
                            KeyChain
                            <span>1</span>X<span>100</span>
                          </h3>
                          <p style={{ fontWeight: "bold" }}>Select Color</p>
                          <p>Black</p>
                          <p>White</p>
                        </div>
                        <div>
                          <h3>100</h3>
                        </div>
                      </div>
                    </ListItem>
                    <Divider />
                    {cart.length > 0
                      ? cart.map((data) => {
                          return (
                            <>
                              <ListItem className={classes.listItem}>
                                <div style={{ display: "flex" }}>
                                  <div>
                                    <h3>
                                      {data.itemName} <span>{data.qty}</span>X
                                      <span>{data.itemPrice}</span>{" "}
                                    </h3>
                                    <p>Select Color</p>
                                    <p>{data.primaryColor}</p>
                                    <p>{data.secondaryColor}</p>
                                  </div>
                                  <div style={{ float: "left" }}>
                                    <h3>{data.itemPrice * data.qty}</h3>
                                  </div>
                                </div>
                              </ListItem>
                              <Divider />
                            </>
                          );
                        })
                      : null}
                    {/* const obj = {
      itemId: itemData.itemId,
      itemName: itemData.itemName,
      primaryColor,
      secondaryColor,
      itemPrice: itemData.price,
      qty
    }; */}
                  </List>
                </CardBody>
                <CardFooter className={classes.cardFooter}></CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Place Your Order</h4>
                  </CardHeader>

                  <CardBody>
                    <CustomInput
                      labelText="Full Name..."
                      id="FullName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Phone Number"
                      id="PhoneNumber"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Address"
                      id="Address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "textArea",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="danger">Cancel Order</Button>
                    <Button color="success">Confirm Order</Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
