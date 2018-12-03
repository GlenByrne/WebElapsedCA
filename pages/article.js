//
// Imports
//
import {withRouter} from 'next/router'

// Import fetch library
import fetch from "isomorphic-unfetch";
import Link from 'next/link';
import React from "react";

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = "ca9dc2643a3742259e6d954bcd3d9bfd";

// Initial News source
const defaultNewsSource = "the-irish-times";

//
// async method fetches and returns data from a url
//
async function getNews(url) {
  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return data;
  } catch (error) {
    // return error if it occurs
    return error;
  }
}

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
//  The News page defined as an ES6 Class
//
class Article extends React.Component {
  // Constructor
  // Receive props and initialise state properties
  constructor(props) {
    super(props);
    this.state = {};
  }

  //
  // render() method generates the page
  //
  render() {
    // Position in articles array to use 
    let id = this.props.router.query.id;

    // Get single article
    let article = this.props.articles[id];
    

    return (
      <div>
        {/* Display a title based on source */}
        <div>
          {/* Show the article) */}
          <section>
          <h1 className="title">{article.title}</h1>
          <p>{article.description}</p>
          <p className="author"> {article.author} {formatDate(article.publishedAt)}</p>
          <img src={article.urlToImage} alt="article image" className="img-article"/>
          <p>{article.content}</p>
          </section>


<h1 className="relatedHeader">Related Articles</h1>
{this.props.articles.map((articleList, index) => (
  <Link as={`/article/${index}`} href={`/article?id=${index}`}>
  
<sidebar>
  <div className="container">
  <img src={articleList.urlToImage} className="relatedImage" alt="article image"/>
<h2 className="relatedTitle">{articleList.title}</h2>
  <div className="overlay">
  </div>
  </div>
</sidebar>
</Link>
))
                    }


        </div>

        <style jsx>{`
          /* CSS for this page */
          section {
            width: 60%;
            border: 1px solid gray;
            background-color: #424242;
            padding: 1em;

            color: #ffffff;
          }
          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          .img-article {
            width: 100%;
          }
          sidebar {
            float: left;
            width: calc(100%/3);
            height: 100%;
            background-color: #424242;
            color: #ffffff;
          }
          .relatedImage {
            width: 100%;
            height: 100%;
          }
          .relatedHeader {
            color: #ffffff;
            text-align: center;
            
          }
          .overlay {
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

          .relatedTitle {
            position: absolute;
            top: 18px;
            left: 5xp;;
            color: #ffffff;
            text-shadow: 2px 2px 5px black;
            background-color: rgba(0, 0, 0, 0.35);

          }
        `}</style>
      </div>
    );
  }

  //
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page
  //
  static async getInitialProps(res) {
    // Build the url which will be used to get the data
    // See https://newsapi.org/s/the-irish-times-api
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} // End class

// export withRouter - enables this class to access React Router properties, e.g. to get the URl parameters
export default withRouter(Article)