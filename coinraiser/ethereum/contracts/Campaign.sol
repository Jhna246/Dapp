pragma solidity ^0.4.17;

contract ContractFactory {
    address[] public deployedCampaigns;
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
    
    function createCampaign(uint min, string name) public {
        address newCampaign = new Campaign(min, name, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
}

contract Campaign {
    
    address public organizer;
    uint public minContribution;
    mapping(address => bool) public contributors;
    uint public contributorsCount;
    Request[] public requests;
    string public title;
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint yesCount;
        mapping(address => bool) votes;
    }
    
    function Campaign(uint min, string name, address creator) public {
        organizer = creator;
        minContribution = min;
        title = name;
    }
    
     function campaignDetails() public view returns(uint, uint, uint, uint, address, string) {
        return (
            minContribution,
            this.balance,
            requests.length,
            contributorsCount,
            organizer,
            title
        );
    }

    function getRequestsCount() public view returns(uint) {
        return requests.length;
    }


    // people funding the campaign
    function fund() public payable {
        require(msg.value >= minContribution);
        require(!contributors[msg.sender]);
        contributors[msg.sender] = true;
        contributorsCount += 1;
    }
    
    // orginizer creating a request to send ether to vendor
    function createRequest(string description, uint value, address recipient) public organizerOnly {
        Request memory newRequest = Request({ 
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            yesCount: 0
        });
        
        requests.push(newRequest);
    }
    
    // donators can vote whether they approve orginizer's request
    function approveRequest(uint idx) public {
        require(contributors[msg.sender]);
        require(!requests[idx].votes[msg.sender]);
        
        requests[idx].votes[msg.sender] = true;
        requests[idx].yesCount += 1;
    }
    
    // orginizer can finilize request if all the quotas are met
    function finalizeRequest(uint idx) public organizerOnly {
        require(!requests[idx].complete);
        require(requests[idx].yesCount > (contributorsCount / 2));
        
        requests[idx].complete = true;
        
        requests[idx].recipient.transfer(requests[idx].value);
    }
    
    modifier organizerOnly() {
        require(msg.sender == organizer);
        _;
    }
}
