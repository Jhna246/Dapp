import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestLayout extends Component {
    state = {
        approveLoading: false,
        finalizeLoading: false
    }

    handleApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({ approveLoading: true})
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
        this.setState({ approveLoading: false })
        Router.replaceRoute(`/campaigns/${this.props.address}/request`)
    }

    handleFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({ finalizeLoading: true})
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
        this.setState({ finalizeLoading: false })
        Router.replaceRoute(`/campaigns/${this.props.address}/request`)
    }

    render() {
        const canFinalize = this.props.request.yesCount > this.props.contributorsCount / 2;

        return(
            <Table.Row disabled={this.props.request.complete} positive={canFinalize && !this.props.request.complete}>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.request.value, 'ether')}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.yesCount}/{this.props.contributorsCount}</Table.Cell>
                <Table.Cell>
                    {this.props.request.complete ? null : (
                        <Button loading={this.state.approveLoading} color="green" basic onClick={this.handleApprove}>Approve</Button>
                    )}
                </Table.Cell>
                <Table.Cell>
                    {this.props.request.complete ? null : (
                        <Button loading={this.state.finalizeLoading} primary basic onClick={this.handleFinalize}>Finalize</Button>
                    )}
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default RequestLayout;
