import React, { Component } from 'react';
import factory from '../../ethereum/factory';
import { Card, Container } from 'semantic-ui-react';
import Layout from '../../components/layout-campaign'
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';


class Campaigns extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        return { campaigns: campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address, title) => {
          return {
            header: title,
            description: (
                <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
            ),
            meta: address,
            fluid: true
          };
        });
    
        return <Card.Group items={items} />;
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
                        <div id='jumbotron-special' className='jumbotron'>
                            <h1>Campaigns</h1>
                        </div>
                        <Container>
                            <div className='py-4'>
                                {this.renderCampaigns()}
                            </div>
                        </Container>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default Campaigns;
