import React,{Component} from 'react'
import {Container,Image,Segment,Grid,Icon,Input,Popup,Button,Form,TextArea} from 'semantic-ui-react';
import Header from '../components/header';
import BidInput from '../components/bidInput';
import AdvertisementAuction from '../ethereum/AdvertisementAuction';
import UploadAndDisplayImage from '../components/uploadImg';

//import 'semantic-ui-css/semantic.min.css';
class AdvertAuction extends Component {

  state = {
    disable: true,
    currentBid: this.props.bid,
    image: '/test.jpg',
    placeholder: '',
    text: '',
    content: 'Advertisement Text'
  }

  static async getInitialProps(props){
    const bid = await AdvertisementAuction.methods.currentBid().call();
    return { bid };
  }
  handleCallBack = (img) =>{
    this.setState({placeholder:img});
  }

  handleBid = (value) =>{
    this.setState({disable: false, currentBid: value})
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({image: this.state.placeholder, content : this.state.text })
    this.setState({disable: true})
  }

  render(){
    return(
      <Container>
        <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
        <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
        <Header />
        <br />
        {console.log(this.state.placeholder)}
        <Grid>
          <Grid.Row>
            <Grid.Column width = {11}>
              <img 
                src = {this.state.image} 
                size = "huge" 
                bordered />
            </Grid.Column>
            <Grid.Column width = {5}>
                <Grid.Row>
                  <h2>Current Bid {this.state.currentBid}</h2>
                </Grid.Row>
                <br />
                <Grid.Row>
                  <h3>Bid (In ether)</h3>
                  <BidInput  handleBid = {this.handleBid}/>
                </Grid.Row>
                <br />
                <Grid.Row>
                  <h3> Add you advertisement image and text</h3>
                </Grid.Row>
                <br />
                <Grid.Row>
                  <UploadAndDisplayImage  parentCallBack = {this.handleCallBack}/>
                </Grid.Row>
                <br />
                <Grid.Row>
                  <h3>Advertisement Text</h3>
                  <Form onSubmit = {this.onSubmit}>
                      <TextArea disabled = {this.state.disable} 
                      value = {this.state.text}
                      onChange = {(event) => this.setState({text: event.target.value})}/>
                      <Button disabled = {this.state.disable} primary>Submit</Button>
                  </Form>
                </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <br />
          <Grid.Row>
            <Grid.Column width = {11}>
              <Segment>
                <p style = {{fontSize: "25px"}}>{this.state.content}</p>  
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default AdvertAuction;