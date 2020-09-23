import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Container, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CreateCampaign extends Component {
    state = {
        minContribution: '',
        title: '',
        errorMsg: '',
        loading: false
    };

    onSubmit = async (event) =>{
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ loading: true, errorMsg: '' });

        try {
            await factory.methods
                .createCampaign(this.state.minContribution, this.state.title)
                .send({
                    from: accounts[0]
            });
            Router.pushRoute('/campaigns/')
            
        } catch(err) {
            this.setState({ errorMsg: err.message })
        }

        this.setState({ loading: false })
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
                    #biggerlabel {
                        font-size:1em;
                    }
                `}
            </style>
                <Layout>
                    <div className="text text-center">
                        <div className='jumbotron'>
                            <h1>Create a Campaign</h1>
                        </div>
                    </div>
                    <Container>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                            <Form.Field>
                                <label id='biggerlabel'> Title</label>
                                <input 
                                    value={this.state.title}
                                    onChange={event => this.setState({ title: event.target.value })}
                                />
                                <label id='biggerlabel' className="pt-4"> Minimum Contribution</label>
                                <Input
                                    label='wei'
                                    value={this.state.minContribution}
                                    onChange={event => this.setState({ minContribution: event.target.value })}
                                />
                            </Form.Field>
                            <Message error header='Error!' content={this.state.errorMsg}></Message>
                            <Button loading={this.state.loading} primary>Create</Button>
                        </Form>
                    </Container>
                </Layout>
            </div>
        )
    }
}

export default CreateCampaign;
