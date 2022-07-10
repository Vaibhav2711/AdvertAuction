const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const advertPath = path.resolve(__dirname,"contracts","advert.sol");
const source = fs.readFileSync(advertPath, "utf8");

//console.log(source);
const input = {
	language: 'Solidity',
	sources: {
		'advert.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};
//console.log("yo");
//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox['evm']);

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["advert.sol"];
const contract  = 'AdvertisementAuction';
//const dirpath = path.resolve(__dirname,)
fs.outputJsonSync(path.resolve(__dirname,contract+'.json'),output[contract]);
console.log('file saved!!');