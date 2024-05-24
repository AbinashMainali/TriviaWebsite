import { FunctionComponent } from "react";
import { Alert, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Input from "../components/Input";
import { useState } from "react";
import TriviaComponent from "../components/TriviaComponent";
import Button from 'react-bootstrap/Button';
import { callApi } from "../helpers/DataRequester";

const Trivia: FunctionComponent = () => {
  const [userName, setUserName] = useState<string>("");
  const [startGame, setStartGame] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);

  const start = () => {
    if (userName === "") {
      alert("Please enter your name");
    } else {
      checkUserName();
    }
  };

  /**
   * check user already exist
   */
  function checkUserName() {
    //check user already exist
    callApi("score/checkUserName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
    .then((r)=>{
      if(r?.ok) {
        setStartGame(true);
      } else {
        setAlreadyExist(true);
      }
    }).catch((e)=>{
      console.log(e);
    });
  }

  function handleInput (e:any) {
    setUserName(e.target.value);
  }



  return (
    <>
      {!startGame ? (
        <Row className="row">
          <Card className="nameCard">
            <Card.Body>
              <Card.Title>Trivia Game</Card.Title>
              <Card.Text>
                Welcome to the Trivia Game. Please enter your name and click on
                the start game button to start the game.
              </Card.Text>
              <label>Enter Your Name</label>
              <Input inputValue={userName} placeHolder='Enter Username' handleChange={handleInput} />
              {alreadyExist && <Alert variant="danger">User already exists.</Alert>}
              {userName !='' && <Button variant="primary" onClick={start}>Start Game</Button>}
            </Card.Body>
          </Card>
        </Row>
      ) : (
        <TriviaComponent name={userName } />
      )}
    </>
  );
};

export default Trivia;
