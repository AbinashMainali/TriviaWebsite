import {FunctionComponent} from "react";
import {Row} from "react-bootstrap";
import ScoreBoard from "../components/ScoreBoard";

const Score: FunctionComponent = () => {
    return(
        <Row>
        <h1>Scoreboard</h1>
        <br/>
    
        <ScoreBoard />
        </Row>
    )
      
}

export default Score