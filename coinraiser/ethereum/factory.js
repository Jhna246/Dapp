import web3 from './web3';
import ContractFactory from './build/ContractFactory.json';

const contract = new web3.eth.Contract(
    JSON.parse(ContractFactory.interface),
    '0xC862c3777a8995D34b8233b8309AE0b8c5ebd308'
);

export default contract;
