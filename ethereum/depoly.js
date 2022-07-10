const HDWallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const advert = require('./AdvertisementAuction.json');
const provider = new HDWallet("flight bird fun sunny pioneer trash nest finger size ladder song canvas",
	"https://rinkeby.infura.io/v3/de039edc82dc49d8a57bc119bb6640b6");
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	const advertAuction = await new web3.eth.Contract(advert['abi']).
	deploy({data: advert['evm'].bytecode.object}).
	send({from: accounts[0], gas: '1000000'});
	console.log("Constract deployed at ", advertAuction.options.address);
	provider.engine.stop();
};
deploy();
