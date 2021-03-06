// Footer component
const Footer = () => (
    <div>
        <footer>
            <p>contact information: info@newssite.com</p>
            <a href="https://newsapi.org">Powered by News API</a>
        </footer>
        <style jsx>{`
            footer {
                background-color: #303030;
                font-size: 0.8em;
                text-align: center;
                color: #ffffff;
                clear: both;
            }

            footer a{
                color: #ffffff;
            }
        `}</style>
    </div> 
 )
 
 export default Footer;
