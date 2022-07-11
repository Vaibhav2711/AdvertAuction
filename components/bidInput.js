import React, {Component} from 'react';
import {Input,Icon,Button} from 'semantic-ui-react';
import AdvertisementAuction from '../ethereum/AdvertisementAuction';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class BidInput extends Component{

	

	state = {
		value: 0
	}

	constructor(props){
		super(props);
	}

	onClick = async (event) =>{
		event.preventDefault();
		const accounts = await web3.eth.getAccounts();
		await AdvertisementAuction.methods.submitBid().send(
			{from: accounts[0], value: this.state.value});
		this.props.handleBid(this.state.value);
	}
	render(){
		return(
				<Input 
				type='text'
				value = {this.state.currentBid}
				onChange = {(event) => this.setState({value : event.target.value})} 
				action>
    				<input />
    				<Button type='submit' onClick = {this.onClick}>Bid</Button>
  				</Input>
        );
	}
}

export default BidInput;