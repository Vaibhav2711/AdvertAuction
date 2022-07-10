import web3 from './web3';
import AdvertisementAuction from './AdvertisementAuction.json';

const instance = new web3.eth.Contract(AdvertisementAuction['abi'],'0x58641378d50E0857Ca4625bDA05ef3bcE07B75D3');

export default instance; 