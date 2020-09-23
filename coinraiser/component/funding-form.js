import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class FundingForm extends Component {
    state = {
        value: '',
        errorMsg: '',
        loading: false
    }

    onSubmit = async () => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMsg: '' });

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.fund().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch(err){
            this.setState({ errorMsg: err.message })
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                <Form.Field>
                    <label><h3>Become a contributor</h3></label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header='Error!' content={this.state.errorMsg}></Message>
                <Button loading={this.state.loading} primary>Send</Button>
            </Form>
        );
    }
}

export default FundingForm;
