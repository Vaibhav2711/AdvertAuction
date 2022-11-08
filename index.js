import {Container,Image,Segment,Grid,Icon,Input,Popup,Button,Form,TextArea,Menu} from 'semantic-ui-react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import {providers,Contract,utils,BigNumber} from "ethers";
import {ABI,ADVERT_ADDRESS} from "../constants";

//import 'semantic-ui-css/semantic.min.css';
export default function Home() {

    //console.log(ADVERT_ADDRESS);
    const zero = BigNumber.from("0");
    const [image,setImage] = useState("./minions.png");
    const [currentBid,setCurrentBid] = useState(zero);
    const [bid,setBid] = useState("0");
    const [advertText,setAdvertText] = useState("Demo Text");
    const [connecting,setConnecting] = useState(false);
    const [showResult,setShowResult] = useState(false);
    const [walletConnected,setWalletConnected] = useState(false);
    const [disable,setDisable] = useState(true);
    const [status,setStatus] = useState("no");
    const web3ModalRef = useRef();
    let temp;
  
    const getProviderOrSigner = async (needSigner = false) =>{
      const provider = await web3ModalRef.current.connect();
      console.log(provider);
      const web3provider = new providers.Web3Provider(provider);
      const {chainId} = await web3provider.getNetwork();
      if(chainId != 5){
        window.alert("Change the network to Goerli");
        throw new Error("Change the network to Goerli");
      }
      if(needSigner){
        const signer = web3provider.getSigner();
        return signer;
      }
      return web3provider;
    };
  
    const getCurrentBid = async() => {
      const provider = await getProviderOrSigner();
      console.log("39");
      const advert = new Contract(ADVERT_ADDRESS,ABI,provider);
      console.log("41");
      const _currentBid = await advert.currentBid();
      console.log("43");
      setCurrentBid(_currentBid.toString());
    };
  
    const connectWallet = async () => {
      try{
        console.log("46");
        await getProviderOrSigner();
        console.log("48");
        setWalletConnected(true);
        console.log("50");
        getCurrentBid();
        //conosle.log("52");
      }catch(err){
        console.error(err);
      }
    };
  
    useEffect(()=>{
      if(!walletConnected){
        web3ModalRef.current = new Web3Modal({
          network:"goerli",
          providerOptions:{},
          disableInjectedProvider:false,
        });
        connectWallet().then(() =>{
          getCurrentBid();
        });
      }
    }, [walletConnected]);
  
    
  
    const renderButton = () =>{
      if(walletConnected){
        return(
          <span className = {styles.subtitle}>Connected</span>
        );
      }else{
        return(<button className = {styles.button} onClick = {connectWallet}>Connect</button>)
        
      }
    };
  
    const renderUpload = () => {
      return(
        <Grid.Row>
            <h3> Add you advertisement image and text</h3>
        </Grid.Row>
        <br />
        <Grid.Row>
            <Input 
			    type='text'
				value = {bid}
				onChange = { (event) =>{
                    //console.log(event.target.files[0].name);
                      setImage(URL.createObjectURL(event.target.files[0]));
                      setAdvertText(temp);
                    //console.log(setSelectedImage);
                    //console.log(URL.createObjectURL(event.target.files[0]));
                    //parentCallBack(URL.createObjectURL(event.target.files[0]));
                    }}
            />
        </Grid.Row>
        <br />
        <Grid.Row>
            <h3>Advertisement Text</h3>
            <Form onSubmit = {this.onSubmit}>
                <TextArea 
                    value = {temp}
                    onChange = {(e)=> temp = e.target.value}/>
                <Button primary>Submit</Button>
            </Form>
        </Grid.Row>
      );
    };
  
    const submitBid = async() => {
  
      console.log("a");
      const signer = await getProviderOrSigner(true);
      const advert = new Contract(ADVERT_ADDRESS,ABI,signer);
      const tx = await advert.submitBid({value: utils.parseUnits(bid)})
      await tx.wait();
      setDisable(false);
      //console.log(bid);
      await getCurrentBid();
      setShowResult(true);
    };
  
    return(
      <Container>
        <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
        <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
        <Menu style = {{marginTop: '10px'}} size = "huge">
  		    <Menu.Item>Advertisement Auction</Menu.Item>
  		</Menu>
        <br />
        <Grid>
          <Grid.Row>
            <Grid.Column width = {11}>
              <img 
                src = {image} 
                size = "huge" 
                bordered />
            </Grid.Column>
            <Grid.Column width = {5}>
                <Grid.Row>
                  <h2>Current Bid {(utils.formatEther(currentBid)).toString()}</h2>
                </Grid.Row>
                <br />
                <Grid.Row>
                  <h3>Bid (In ether)</h3>
                  <Input 
				    type='text'
				    value = {bid}
				    onChange ={(event) => setBid(event.target.value)}
				    action>
    				    <input />
    				    <Button type='submit' onClick = {submitBid}>Bid</Button>
  				    </Input>
                </Grid.Row>
                <br />
                {showResult ? renderUpload(): null}
            </Grid.Column>
          </Grid.Row>
          <br />
         
        </Grid>
      </Container>
    );
  }