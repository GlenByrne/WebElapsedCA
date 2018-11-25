import React, { Component } from 'react';

// import page components
import Meta from '../components/Meta';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Build the page template from components
class Page extends Component {
    render() {
        return (
            <div>
                <body>

                
                {/* Content to output*/}
                <Meta />
                <Header />
                <Nav />
                {/* Render props passed to this Component */}
                {this.props.children}
                <Footer />

                <style jsx> {`
            body {
                background-color: #303030;
                margin: 0em;
            }
            `}</style>
                </body>
                
            </div>
            
        );
    }
}

export default Page;

