import React,{Component} from 'react';
import firebase from  '../Firebase'


class Form extends Component{
    state ={
        ItemName:'',
        setCategory: '',
        cat:["KeyChains","HandBags & Clutches","Accessories","Shawls","Mittens"],
        price:'',
        pictures: []
    }
    onHandleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value })

    }
    onImageChange = (e)=>{
        let img = e.target.files[0];
        this.setState({
            pictures: URL.createObjectURL(img)
        });
    }
    onSubmit = ()=>{
        console.log(this.state)
    }
    render(){
        return(
            <div>
            <div>
                <h3>ItemName</h3>
                <input  type="text" name="ItemName" id="ItemName" onChange={(e) => this.onHandleChange(e)} value={this.state.ItemName} maxLength="70" />
            </div>
            <div>
                <h3>price</h3>
                <input  type="text" name="price" id="price" onChange={(e) => this.onHandleChange(e)} value={this.state.price} maxLength="70" />
             </div>
            <div>
            <h3>Select Product Type</h3>
            <select onChange={(e) => this.onHandleChange(e)} name='setCategory' value={this.state.setCategory}>
                {this.state.cat.map((data,index)=> <option key={index} value={data}>{data}</option>)}
             </select>
             </div>
            <div>
                <h3>Add Picture</h3>
               <input type="file" name="pictures" onChange={(e)=>this.onImageChange(e)} /> 
            </div>
             <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

export default Form