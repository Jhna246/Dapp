const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/ContractFactory.json');

const provider = new HDWalletProvider(
    //Insert 12 mnemonic code here 
    'https://rinkeby.infura.io/v3/25ed92e9e0d14de79a466a7519704f82'
);

const web3 = new Web3(provider);

let accounts;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};

deploy()
