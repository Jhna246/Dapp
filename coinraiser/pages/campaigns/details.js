import React, { Component } from 'react';
import Layout from '../../components/layout.js';
import Campaign from '../../ethereum/campaign';
import { Card, Container, Button } from 'semantic-ui-react';
import FundingForm from '../../components/funding-form';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignDetails extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const detail = await campaign.methods.campaignDetails().call();
        
        return { 
            address: props.query.address,
            minContribution: detail[0],
            balance: detail[1],
            requestsCount: detail[2],
            contributorsCount: detail[3],
            organizer: detail[4],
            title: detail[5]
        }
    }

    renderDetails() {

        const items = [
            {
                header: 'Balance:',
                meta: 'ether',
                description: web3.utils.fromWei(this.props.balance, 'ether'),
                fluid: true
            },
            {
                header:'Total Amount of Contributions:',
                description: this.props.contributorsCount,
                fluid: true
            },
            {
                header:'Minimum Contribution Required:',
                meta: 'ether',
                description: web3.utils.fromWei(this.props.minContribution, 'ether'),
                fluid: true
            },
            {
                header:'Total requests made by organizer:',
                meta: this.props.requestsCount,
                description: (
                    <Link route={`/campaigns/${this.props.address}/request`}>
                        <a>Click to see requests</a>
                    </Link>
                    ),
                fluid: true
            },
        ];

        return <Card.Group centered items={items} />
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .jumbotron {
                        background-color:#7FFFD4;
                    }
                    .jumbotron h1 {
                        font-size: 4em;
                    }
                `}
                </style>
                <Layout>
                    <div className="text text-center">
                        <div className="jumbotron">
                            <h1>{this.props.title}</h1>
                            <h3>Organized by: {this.props.organizer}</h3>
                        </div>
                        <Container>
                            <div className='row'>
                                <div className="col-lg-9">
                                    {this.renderDetails()}
                                </div>
                                <div className="col-lg-3 pt-5 pt-lg-0">
                                    <FundingForm address={this.props.address} />
                                </div>
                            </div>
                        </Container>
                    </div>
                    
                </Layout>
            </div>
        )
    }
}

export default CampaignDetails
