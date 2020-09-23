import Web3 from 'web3';

let web3;

//check if we are in browser and user uses metamask
if (typeof window !== 'undefined' && typeof window.web3 != 'undefined') {
    //enable metamask on our browser
    window.ethereum.enable()

    // get the provider created by metamask
    web3 = new Web3(window.web3.currentProvider);
} else {
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/25ed92e9e0d14de79a466a7519704f82'
    );
    web3 = new Web3(provider);
}

export default web3
