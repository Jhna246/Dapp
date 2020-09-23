import React, { Component } from 'react';
import Layout from '../../../components/layout';
import { Button, Container } from 'semantic-ui-react';
import { Link } from '../../../routes';
import RequestForm from '../../../components/request-form';

class CreateRequest extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address: address }
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
                            <h1>Create a Request</h1>
                        </div>
                    </div>
                    <Container>
                        <RequestForm address={this.props.address} />
                        <div className="pt-3">
                            <Link route={`/campaigns/${this.props.address}/request`}>
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

export default CreateRequest
