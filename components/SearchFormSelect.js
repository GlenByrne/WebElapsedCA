import React, { Component } from 'react';
import Select from 'react-select';

// Define SearchForm Class

const options = [{
    value: 'engadget',
    label: 'Engadget'
},
    {
        value: 'rte',
        label: 'RTE'
    },
    {
        value: 'reddit-r-all',
        label: 'Reddit'
    },
    {
        value: 'bbc-news',
        label: 'BBC News'
    },
    {
        value: 'business-insider',
        label: 'Business Insider'
    },
    {
        value: 'independent',
        label: 'Independent'
    },
    {
        value: 'techradar',
        label: 'TechRadar'
    }
];

export default class SearchFormSelect extends Component {

// constructor accepts props and initialises state

constructor(props) {

super(props);

this.state = {
    selectedOption: ""
};

}

handleChange = (selectedOption) => {
    this.props.setNewsSource(selectedOption.value);
    console.log("Option Selected: ", selectedOption);
}

render() {

return (

<div>

{/* Search Input */}

<div id="search">

<h3 className="header">Select a News Source</h3>

{/* Note event handler */}

<Select
          options={options}
          onChange={this.handleChange}
        />

</div>

 <style jsx> {`
  
  /* CSS for this page */
    .header {
        color: #ffffff;
    }
  
  `}</style>
</div>


);

}

}