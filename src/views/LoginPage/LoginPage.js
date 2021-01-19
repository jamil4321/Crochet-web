import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import firebase from 'Firebase.js'

import image from "assets/img/bg7.jpg";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [Address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cartNull, setCartNull] = React.useState(false);
  const [dataNull, setDataNull] = React.useState(false);
  const [dataSend, setDataSend] = React.useState(false)

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
  const SubmitOder = () => {

    let url = 'https://fcm.googleapis.com/fcm/send'
    let Auth = 'key=AAAA_xaTxqo:APA91bFOts2bOGVA8_T2MckMzSabvVmjLIkQrEk91uKJ6pTonMAcSVlLx5oe3zK3aytSMNGIPdhoLZ7gYIjMN7OlaJED9TTrwY_I7nfm-du29tmgaAHX4O0N5Xc41T3C568HqxBYxWQM'


    if (name !== "" && email !== "" && Address !== "" && phone !== "" && cart.length !== 0) {
      const OrderID = Math.floor(Math.random() * 100000000000000000000)
      let now = Date.now();
      const Order = {
        OrderID,
        DateTime: now,
        cart,
        email,
        name,
        Address,
        phone,
        Total
      }
      firebase.database().ref(`order/${OrderID}/`).set(Order)
      setDataSend(true)
      setTimeout(() => { setDataSend(false); window.location.replace('/') }, 3000)

      firebase.database().ref('token').once('value', snapshot => {
        let value = Object.values(snapshot.val())
        value.map(data => {
          let notification = {
            "to": data,
            "collapse_key": "type_a",
            "notification": {
              "body": "You Got New Order Amount " + Order.Total,
              "title": "New Order",
              "image": ""
            },
            "data": {
              "body": "You Got New Order Amount " + Order.Total,
              "title": "New Order",
              "image": ""
            }
          }

          let promise = fetch(url, {
            method: 'POST',
            headers: { 'Authorization': Auth, 'Content-Type': 'application/json' },
            body: JSON.stringify(notification)
          })

        })
      })

    } else if (cart.length === 0) {
      setCartNull(true)
      setTimeout(() => setCartNull(false), 3000)
    } else {
      setDataNull(true)
      setTimeout(() => setDataNull(false), 3000)
    }

  }
  let Total = 0.00;
  if (cart.length > 0) {
    Total = parseFloat(cart.map(item => item.itemAmount).reduce((a, b) => a + b)).toFixed(2);
  }
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
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="info" className={classes.cardHeader}>
                  <h4>Your Selected Items</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ overflowX: 'scroll' }}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No</TableCell>
                          <TableCell>Item Image</TableCell>
                          <TableCell>Item Name</TableCell>
                          <TableCell>Item Qty</TableCell>
                          <TableCell>Item Price</TableCell>
                          <TableCell>Total Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        {cart.length > 0
                          ? cart.map((data, i) => {
                            return (
                              <>
                                <TableRow className={classes.listItem} >
                                  <TableCell>{i + 1}</TableCell>
                                  <TableCell>{!!data.img ? <img src={data.img.url} alt={data.img.name} style={{ width: 100, height: 100 }} /> : null}</TableCell>
                                  <TableCell><h3>{data.itemName}</h3><p>Select Color</p>
                                    <p>{data.primaryColor}</p>
                                    <p>{data.secondaryColor}</p> </TableCell>
                                  <TableCell>{data.qty}</TableCell>
                                  <TableCell>{data.itemPrice}</TableCell>
                                  <TableCell>{data.itemAmount}</TableCell>
                                </TableRow>
                                <Divider />
                              </>
                            );
                          })
                          : null}
                        <TableRow>
                          <TableCell align="right" colSpan={5}><h5>Total Amount</h5></TableCell>
                          <TableCell align="right"><h5>{Total}</h5></TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                    <div>
                      <Table>
                        <TableBody>

                        </TableBody>
                      </Table>
                    </div>
                  </div>
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

                        value: name,
                        onChange: (e) => setName(e.target.value),
                      }}
                    />
                    <CustomInput
                      labelText="Phone Number"
                      id="PhoneNumber"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",

                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
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

                        value: email,
                        onChange: (e) => setEmail(e.target.value),
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
                        value: Address,
                        onChange: (e) => setAddress(e.target.value),
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="danger">Cancel Order</Button>
                    <Button color="success" onClick={SubmitOder}>Confirm Order</Button>
                  </CardFooter>
                </form>
                {cartNull ? <SnackbarContent
                  message={
                    <span>
                      <b>INFO ALERT:</b> Kindly Select Atleast One or more Record
            </span>
                  }
                  close
                  color="warning"
                  icon={Warning}
                /> : null}
                {dataNull ? <SnackbarContent
                  message={
                    <span>
                      <b>INFO ALERT:</b> Kindly Fill Compelte from
            </span>
                  }
                  close
                  color="warning"
                  icon={Warning}
                /> : null}
                {dataSend ? <SnackbarContent
                  message={
                    <span>
                      <b>INFO ALERT:</b> Your Order Has Been Confirmed
            </span>
                  }
                  close
                  color="success"
                  icon={Check}
                /> : null}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
