import React, { Component } from 'react';
import { render } from 'react-dom';
import Layout from '../components/layout-noheader';
import { Container, Button } from 'semantic-ui-react';
import { Link } from '../routes';


export default class Home extends Component {
    render() {
        return (
        <div>
            <style jsx>{`
                div {
                    font-family: 'Balsamiq Sans', cursive;
                }
                .jumbotron {
                    background-color:#7FFFD4;
                }
                .jumbotron h1 {
                    font-size: 4.5em;
                }
                h1 {
                    font-size:3em;
                }
                p {
                    font-size:1.4em;
                }
            `}
            </style>
            
            <Layout>

                <div className="jumbotron text text-center">
                    
                    <h1>Coinraiser</h1>
                    <h3 className="pb-3"><i>A platform where creative projects come to life</i></h3>
                        <Link route="./campaigns/">
                            <Button 
                                content="Click here to get started"
                                icon="right arrow"
                                labelPosition='right'
                                size='large'
                                primary
                            />
                        </Link>
                </div>
                
                <Container>
                    <div>
                        <div className="py-4">
                            <h1>What is Coinraiser?</h1>
                            <p>
                                Coinraiser campaigns make ideas into reality.
                            </p>
                            <p>
                                It’s where creators share new visions for creative work 
                                with the communities that will come together to fund them.
                            </p>
                        </div>
                        <hr />
                        <div className="py-4">
                            <h1>Why Coinraiser?</h1>
                            <p>
                                In Coinraiser, campaign contributors can have a say in
                                where the funded money goes to. 
                            </p>
                            <p>
                                Campaign organizers must send a request to the contributors
                                whenever they want to send money to a vendor. 
                            </p>
                            <p>
                                Contributors then vote whether or not they approve the request. 
                            </p>
                            <p>
                                This way, campaign organizers will spend 100% of funded money
                                to the creation of the product!
                            </p>
                        </div>
                    </div>
                </Container>
            </Layout>
        </div>
      )
    }
  }
