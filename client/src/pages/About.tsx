import {FunctionComponent} from "react";
import {Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About: FunctionComponent = () => {
    return (
        <Row>
            <h1>About</h1>
            <h2>Trivia Web app</h2>
            <p>Trivia is a web app that allows users to play trivia games and view their scores on a scoreboard.</p>
            <h2>Technologies</h2>
            <p>Trivia is built using the following front end technologies:</p>
            <ul>
                <li>React</li>
                <li>Typescript</li>
                <li>Bootstrap</li>
                <li>React Bootstrap</li>
                <li>React Router</li>
            </ul>
            <p>Trivia is built using the following back end technologies:</p>
            <ul>
                <li>Node</li>
                <li>Express</li>
                <li>Restful API</li>
            </ul>
            <p>Trivia is built using the following database technologies:</p>
            <ul>
                <li>MongoDb</li>
                <li>Mongoose</li>
            </ul>
            <p>Trivia is deployed using the following technologies:</p>
            <ul>
                <li>Azure</li>
            </ul>
          

        
                


        </Row>
    )
}

export default About