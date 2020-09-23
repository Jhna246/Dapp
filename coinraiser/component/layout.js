import React from 'react';
import Header from './header'
import Head from 'next/head';

export default (props) => {
    return(
        <div>
            <style jsx>{`
                div {
                    font-family: 'Balsamiq Sans', cursive;
                }
            `}
            </style>
            <title>Coinraiser</title>
            <Head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.css"/>
                <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet" />
            </Head>

            <Header />
            {props.children}
        </div>
    )
};
