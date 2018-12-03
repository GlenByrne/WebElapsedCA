// This is the Link API
import Link from 'next/link';
// Import fetch library
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
import SearchFormSelect from '../components/SearchFormSelect';
import React from "react";

const newsSource = 'the-irish-times';

const apiKey = 'ca9dc2643a3742259e6d954bcd3d9bfd';


// Search Options for dropdown



const filterNews = (inputValue) => {
    if (inputValue) {
        return options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    return options;
};

function formatDate(input) {
    const date = new Date(input);
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();


    return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
}

//

// getNews(url) is an async method which fetches and returns data (or an error) from a WWW API

//

async function getNews(url) {

    // try fetch and catch any errors

    try {

        // Make async call

        const res = await fetch(url);

        // get json data when it arrives

        const data = await res.json();

        // return json data

        return (data);

    } catch (error) {

        // return error if it occurs

        return (error);

    }
}

//

// The News page defined as an ES6 Class

//

export default class News extends React.Component {

    // Constructor

    // Receive props and initialise state properties

    //

    constructor(props) {

        super(props);

        this.state = {

            newsSource: "",

            url: "",

            articles: []

        }

    } //end Constructor

    //

    // render() method generates the page

    //

    setNewsSource = (input) => {
        this.setState({
            newsSource: input,
            url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
        })
    };

    // Get all articles by searching for keyword(s)
    // https://newsapi.org/docs/endpoints/

    searchNewsAPI = (event) => {
        // Set state values - this will trigger an update and componentDidUpdate
        this.setState({
            // Get the link text
            newsSource: `${event.target.innerText}`,
            // Build the search URL using the link name
            url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
        });
        console.log(this.state.url);
    };


    render() {

        // if state.articles is empty copy props to it

        if (this.state.articles.length === 0) {

            this.state.articles = this.props.articles;

        }

        return (

            <div>

                <div className="select">

                <SearchForm setNewsSource={this.setNewsSource}/>
                <SearchFormSelect setNewsSource={this.setNewsSource}/>

                    { /* Add the SearchForm component */} { /* Pass the setNewsSource function as a prop with the same name */}
                    
                </div>
                { /* Example search links - note using name attribute for parameters(!!) */}
                <ul className="newsMenu">
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=business">Business News Ireland</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=technology">Technology News</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="everything?language=en&q=weather">Weather News</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=entertainment">Entertainment News</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=sports">Sports News</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=science">Science News</a></li>
                    <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=health">Health News</a></li>
                </ul>

                { /* Display a title based on source */}

                {/* <h3>{this.state.newsSource.split("-").join(" ")}</h3> */}

                <div>

                    { /* Iterate through articles using Array map) */}

                    { /* Display author, publishedAt, image, description, and content */}

                    { /* for each story. Also a link for more.. */}

                    {this.state.articles.map((article, index) => (
                        <Link as={`/article/${index}`} href={`/article?id=${index}`}>
                            <section key={index}>

                                <div className="container">


                                    <img src={article.urlToImage} alt="article image" className="img-article"/>

                                    <div className="card-bottom">
                                        <h3 className="title">{article.title}</h3>

                                        <p className="author"> {article.author} {formatDate(article.publishedAt)}</p>
                                    </div>
                                    <div className="overlay">
                                    </div>
                                </div>
                            </section>
                        </Link>
                    ))
                    }

                </div>

                <style jsx> {`
  
  /* CSS for this page */
  
  section {
    width: calc(100%/3);
    height: 100%;
    background-color: #424242;
    float: left;
    display: inline;
  
  
  }

  .select {
    max-width: 400px;
    padding: 1em;
  }

  .overlay{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.35);
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition: .3s ease;
  }

  .overlay:hover{
  
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    
    }

    .container {
        position: relative;
        width: 100%;
    }

    .card-bottom {
      border: 0.5px solid #303030;
      height: 9em;
    }

  .title {
    text-align: center;

    color: white;
    text-shadow: 2px 2px 5px black;
    background-color: #424242; 
    padding: 1em;
    margin: 0em;
  }
  
  .author {
  
    font-style: italic;
    position: absolute;
    font-size: 0.8em;
    color: white;
    text-shadow: 2px 2px 5px black;
    background-color: #424242; 
    padding: 1em;
    margin: 0em;
    bottom: 0;
    left: 0;
  }
  
  .img-article {
  
    display: block;
    width: 100%;
    height: 17.5em;
    border: 0.5px solid #424242;
  
  }

  .newsMenu {
    display: flex;
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }

  .newsMenu li {
    display: inline-table;
    padding-left: 20px;
  }

  .newsMenu li a {
    font-size: 1em;
    color: #ffffff;
    display: block;
    text-decoration: none;
  }

  .newsMenu li a:hover {
    color: rgb(255, 187, 0);
    text-decoration: underline;
  }
  
  `}</style>

            </div>

        );

    } // End render()

    // Get initial data on server side using an AJAX call

    // This will initialise the 'props' for the News page

    // Note that getInitialProps() is called before the constructor

    //

    // Get initial data on server side using an AJAX call

    // This will initialise the 'props' for the News page

    //

    static async getInitialProps(response) {

        // Build the url which will be used to get the data
        // See https://newsapi.org/s/the-irish-times-api
        const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;
    
        // Get news data from the api url
        const data = await getNews(defaultUrl);
    
        // If the result contains and articles array then it is good so return articles
        if (Array.isArray(data.articles)) {
          return {
            articles: data.articles
          }
        }
        // Otherwise it contains an error, log and redirect to error page (status code 400)
        else {
          console.error(data)
          if (response) {
            response.statusCode = 400
            response.end(data.message);
          }
        }
      }
    
      // componentDidUpdate is called when the page state or props re updated
      // It can be over-ridden to perform other functions when an update occurs
      // Here it fetches new data using this.state.newsSource as the source
      async componentDidUpdate(prevProps, prevState) {
    
        // Check if newsSource url has changed to avoid unecessary updates 
        if (this.state.url !== prevState.url) {
    
          // Use api url (from state) to fetch data and call getNews()
          const data = await getNews(this.state.url);
    
          // If the result contains and articles array then it is good so update articles
          if (Array.isArray(data.articles)) {
            // Store articles in state
            this.state.articles = data.articles;
            // Force page update by changing state (make sure it happens!)
            this.setState(this.state);
          }
          // Otherwise it contains an error, log and redirect to error page (status code 400)
          else {
            console.error(data)
            if (response) {
              response.statusCode = 400
              response.end(data.message);
            }
          }
        }
      } // End componentDidUpdate

}