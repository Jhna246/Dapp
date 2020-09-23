import React, { Component } from 'react';
import Layout from '../../../components/layout';
import { Button, Container, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestLayout from '../../../components/request-layout';

class RequestIndex extends Component {
    static async getInitialProps(props){

        const campaign = Campaign(props.query.address);

        const detail = await campaign.methods.campaignDetails().call();

        const requestCount = await campaign.methods.getRequestsCount().call();

        const contributorsCount = await campaign.methods.contributorsCount().call();

        console.log(requestCount);
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        console.log(requests);

        return { 
            address: props.query.address,
            organizer: detail[4],
            title: detail[5],
            requests: requests,
            requestCount: requestCount,
            contributorsCount: contributorsCount
        }
    }

    renderRequest() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestLayout
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    contributorsCount={this.props.contributorsCount}
                />
            );
        });
    }

    render() {
        return(
            <div>
                <style jsx>{`
                    .jumbotron{
                        background-color: #7FFFD4;
                    }

                    h1 {
                        font-size:4em;
                    }
                `}
                </style>
                <Layout>
                    <div className="text text-center">
                        <div className="jumbotron">
                            <h1>Requests</h1>
                            <h3>Made by: {this.props.organizer}</h3>
                        </div>
                    </div>
                    <Container>
                        <div className="text text-center">
                            <h3>Requests For: {this.props.title}</h3>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                                        <Table.HeaderCell>Approve</Table.HeaderCell>
                                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>{this.renderRequest()}</Table.Body>
                            </Table>
                            
                            <Link route={`/campaigns/${this.props.address}/request/create`}>
                                <Button
                                    content="Crete Request"
                                    icon="add circle"
                                    labelPosition='right'
                                    size='medium'
                                    primary
                                />
                            </Link>
                        
                            <Link route={`/campaigns/${this.props.address}`}>
                                <Button
                                    content="Go back"
                                    icon="reply"
                                    labelPosition='right'
                                    size='medium'
                                    primary
                                />
                            </Link>
                        </div>
                    </Container> 
                </Layout>
            </div>
        )
    }
}

export default RequestIndex
