const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ContractFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('100', 'new mechanical watch')
        .send({ from: accounts[0], gas: '1000000' });
    
    [campaignAddress] = await factory.methods.getDeployedCampaigns()
        .call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('campgain and factory gets deployed', () => {
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    });

    it('campaign orginizer was the one who made the campaign', async () => {
        const organizer = await campaign.methods.organizer().call()

        assert.equal(accounts[0], organizer)
    });

    it('campaign has a title', async () => {
        const title = await campaign.methods.title().call()

        assert.equal('new mechanical watch', title)
    });

    it('people can fund', async () => {
        await campaign.methods.fund().send({
            value:'200',
            from: accounts[1]
        });

        const isContributor = await campaign.methods.contributors(accounts[1]).call();
        assert(isContributor);
    });

    it('min contribution', async () => {
        try {
            await campaign.methods.fund().send({
                value: '10',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('request can be made by organizer', async () => {
        await campaign.methods
            .createRequest('test description', '10', accounts[2])
            .send({from: accounts[0], gas: '1000000'})
        
            const request = await campaign.methods.requests(0).call();
            assert.equal('test description', request.description);
            assert.equal('10', request.value);
            assert.equal(accounts[2], request.recipient);
    });

    it('requests can get finalized', async () => {
        await campaign.methods.fund().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
            .send({from: accounts[0], gas: '1000000'});

        await campaign.methods.approveRequest(0)
            .send({from: accounts[0], gas: '1000000'});

        await campaign.methods.finalizeRequest(0)
            .send({from: accounts[0], gas: '1000000'});

        //check if accounts[2] gets the ether
        let bal = await web3.eth.getBalance(accounts[2])
        bal = web3.utils.fromWei(bal, 'ether');
        bal = parseFloat(bal);
        assert(bal > 105);
    });

    it('vote goes through', async () => {
        await campaign.methods.fund().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
            .send({from: accounts[0], gas: '1000000'});
        
        await campaign.methods.approveRequest(0)
            .send({from: accounts[0], gas: '1000000'});
        
        const request = await campaign.methods.requests(0).call();
        assert.equal('1', request.yesCount);
    });

    it('non contributor votes does not go through', async () => {

        await campaign.methods
            .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
            .send({from: accounts[0], gas: '1000000'});
        
        try {
            await campaign.methods.approveRequest(0)
                .send({from: accounts[3], gas: '1000000'});
            assert(false);
        } catch(err) {
            assert(err)
        }
    });

    it('non organizer tries to create request', async () => {
        await campaign.methods.fund().send({
            from: accounts[1],
            value: web3.utils.toWei('10', 'ether')
        });

        try {
            await campaign.methods
                .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
                .send({from: accounts[1], gas: '1000000'});
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it('organizer tries to finalize without enough votes', async () => {
        await campaign.methods.fund().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
            .send({from: accounts[0], gas: '1000000'});

        try {
            await campaign.methods.finalizeRequest(0)
                .send({from: accounts[0], gas: '1000000'});
            assert(false);
        } catch(err) {
            assert(err);
        }   
    });

    it('contributor tries approving request more than once', async () => {
        await campaign.methods.fund().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('test description 2', web3.utils.toWei('9', 'ether'), accounts[2])
            .send({from: accounts[0], gas: '1000000'});

        await campaign.methods.approveRequest(0)
            .send({from: accounts[0], gas: '1000000'});
        
        try {
            await campaign.methods.approveRequest(0)
                .send({from: accounts[0], gas: '1000000'});
            assert(false);
        } catch(err) {
            assert(err);
        }
    });
});
