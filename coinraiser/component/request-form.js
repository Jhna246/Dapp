import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestForm extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMsg: '',
        loading: false
    }

    onSubmit = async () => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
    
        this.setState({ loading: true, errorMsg: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(this.state.description, web3.utils.toWei(this.state.value, 'ether'), this.state.recipient)
                .send({ from: accounts[0]});
                
            Router.pushRoute(`/campaigns/${this.props.address}/request`)

        } catch(err) {
            this.setState({ errorMsg: err.message});
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event=> this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Error!' content={this.state.errorMsg}></Message>
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </div>
        )
    }
}

export default RequestForm
