// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import React from "react";

const apiKey = 'ca9dc2643a3742259e6d954bcd3d9bfd';

const defaultNewsSource = 'the-irish-times';

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


// Pass this content as 'props' to child components
const Story = (props) => (
  <div>
  <h3>{props.article.title}</h3>
  <p className="author">{props.article.author} {formatDate(props.article.publishedAt)}</p>
  <img src={props.article.urlToImage} alt="article image" className="img-article"/>
  <p>{props.article.description}</p>
  <p>{props.article.content}</p>

  <style jsx> {`
  
  /* CSS for this page */
  
  section {
  
  width: 33%;

  height: 100%;
  
  border: 1px solid gray;
  
  background-color: rgb(240, 248, 255);

  float: left;

  display: inline;
  
  
  }

  body {
    background-color: black;
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

  .title {
    text-align: center;
    position: absolute;
    width: 24.55em;
    color: white;
    text-shadow: 2px 2px 5px black;
    background-color: rgba(0, 0, 0, 0.35); 
    padding: 1em;
  }
  
  .author {
  
    font-style: italic;
  
    font-size: 0.8em;
    position: absolute;
    bottom: 0;
    color: white;
    text-shadow: 2px 2px 5px black;
    background-color: rgba(0, 0, 0, 0.35); 
    padding: 1em;
  }
  
  .img-article {
  
    display: block;
    width: 100%;
    height: 17.5em;
    border: 0.5px solid #e8e8e8;
  
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
    color: blue;
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

Story.getInitialProps = async function (context) {
const { id } = context.query;
const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`);
const show = await res.json();

console.log(`Fetched show: ${show.name}`);

return { show }
};

export default Story;