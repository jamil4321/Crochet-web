import React, { Component } from 'react';
import firebase from '../Firebase'


class Form extends Component {
    state = {
        ItemName: '',
        setCategory: '',
        cat:["KeyChains","HandBags & Clutches","Accessories"],
        price:'',
        pictures: []
    }
    onHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    onImageChange = (e) => {
        this.setState({
            pictures: e.target.files[0]
        });
    }
    onSubmit = () => {
        console.log(this.state)
        let id = `${this.state.ItemName}-${Math.floor(Math.random() * 10000000000000)}`
        let data = {
            itemId: id,
            itemName: this.state.ItemName,
            setCategory: this.state.setCategory,
            price: Number(this.state.price),
            pictures: this.state.pictures
        }
        let uploadRef = firebase.storage().ref(`images/${data.itemId}`).put(data.pictures);
        uploadRef.on('state_changed', snapshot => { }, err => {
            console.log(err)
        }, () => {
            firebase.storage().ref('images').child(`${data.itemId}`).getDownloadURL().then(url => console.log(url))
        })
        firebase.database().ref(`subCat/${data.itemId}`).set(data)
        this.setState({
            ItemName: '',
            setCategory: '',
            price: '',
            pictures: []
        })
    }
    render() {
        return (
            <div>
                <div>
                    <h3>ItemName</h3>
                    <input type="text" name="ItemName" id="ItemName" onChange={(e) => this.onHandleChange(e)} value={this.state.ItemName} maxLength="70" />
                </div>
                <div>
                    <h3>price</h3>
                    <input type="text" name="price" id="price" onChange={(e) => this.onHandleChange(e)} value={this.state.price} maxLength="70" />
                </div>
                <div>
                    <h3>Select Product Type</h3>
                    <select onChange={(e) => this.onHandleChange(e)} name='setCategory' value={this.state.setCategory}>
                        <option value=''>---Select Options---</option>
                        {this.state.cat.map((data, index) => <option key={index} value={data}>{data}</option>)}
                    </select>
                </div>
                <div>
                    <h3>Add Picture</h3>
                    <input type="file" name="pictures" onChange={(e) => this.onImageChange(e)} />
                </div>
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

export default Form