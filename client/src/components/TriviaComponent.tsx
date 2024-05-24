import { FunctionComponent, useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import Timer from "../helpers/Timer";
import Button from "react-bootstrap/Button";
import { callApi } from "../helpers/DataRequester";
import "bootstrap/dist/css/bootstrap.min.css";

interface TriviaProps {
  name: string;
}

interface IQuestions {
  question: string;
  options: IOptions[];
}

interface IOptions {
  option: string[];
  isCorrect: boolean;
}

interface IScoreData {
  name: string;
  score: number;
  time: number;
}

const TriviaComponent: FunctionComponent<TriviaProps> = ({ name }) => {
  const [questionAnswers, setQuestionAnswers] = useState<IOptions[]>([]);
  const [isFinish, setIsFinish] = useState<Boolean>(false);
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timerValue, setTimerValue] = useState<number>(0);
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const [radioKey, setRadioKey] = useState<number>(0);
  const [scoreData, setScoreData] = useState<IScoreData>();
  const [isRadioChecked, setIsRadioChecked] = useState<boolean>(false);

  const getQuestions = async () => {
    const questionsConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    callApi("question/getQuestion", questionsConfig)
      .then((r) => {
        r.json().then((data: any) => {
          setQuestions(data);

          //console.log(data.map((c: any) => c.options.map((d: any) => d.isCorrect)));
          //console.log(data.map((a:any)=>a.options.map((b:any)=>b.option)));
          //console.log(data.map ((d:any) => d.question));
        });
      })
      .catch((e) => console.log("Error", e));
  };

  useEffect(() => {
    if (!questions?.length) {
      console.log("send");
      getQuestions();
    }
  }, []);

  const handleTimerUpdate = (timer: number) => {
    if (!stopTimer) {
      setTimerValue(timer);
    }
  };

  const compareAnswers = (answerA: IOptions, answerB: IOptions) => {
    return (
      answerA.option === answerB.option &&
      answerA.isCorrect === answerB.isCorrect
    );
  };

  const handleAnswerSelection = (choice: IOptions) => {
    setQuestionAnswers((prevAnswers) => {
      const isAnswerExists = prevAnswers.some((answer) =>
        compareAnswers(answer, choice)
      );
      if (!isAnswerExists) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = choice;
        return updatedAnswers;
      } else {
        return prevAnswers;
      }
    });
    setIsRadioChecked(true); // Set isRadioChecked to true when a radio input is selected
    console.log(questionAnswers);
  };

  function scoreCalculation() {
    const updatedScore = questionAnswers.reduce((score, answer) => {
      return answer.isCorrect ? score + 1 : score;
    }, 0);

    setScoreData({
      name: name,
      score: updatedScore,
      time: timerValue,
    });
  }

  /**
   * function to record score
   */
  const record = async (scoreRecord: IScoreData) => {
    const recordScoreConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreRecord),
    };
    console.log("scoreRecord ", scoreRecord);
    await callApi("score/record", recordScoreConfig);
  };

  useEffect(() => {
    if (isFinish && scoreData) {
      record(scoreData);
    }
  }, [scoreData, isFinish]);

  async function next() {
    if (questions.length > currentQuestionIndex + 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRadioKey(radioKey + 1);
      setIsRadioChecked(false);
    } else {
      //call finish() function
      scoreCalculation();
      setIsFinish(true);
      setStopTimer(true);
    }
  }

  function getClass(isCorrect: Boolean) {
    return isCorrect ? "correct-block" : "incorrect-block";
  }

  return (
    <Row className="row">
      {!isFinish && (
        <Card className="Trivia">
          <Card.Body>
            <Card.Title>Trivia Game</Card.Title>
            <Card.Text>
              Welcome to the Trivia Game {name.toUpperCase()}. Please enter your
              name and click on the start game button to start the game.
            </Card.Text>
            {questions?.length > 0 && (
              <>{questions[currentQuestionIndex].question}</>
            )}
            <br />

            <div className="form-group" id="option-form">
              {questions?.length > 0 &&
                questions[currentQuestionIndex].options.map(
                  (choice: any, index: number) => {
                    const fieldId = `choice-${index}`;

                    return (
                      <div key={index}>
                        <div className="form-check" key={fieldId}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="choiceRadio"
                            id={fieldId}
                            key={`${radioKey}-${index}`}
                            onChange={() => {
                              handleAnswerSelection(choice);
                            }}
                          />
                          <label className="form-check-label" htmlFor={fieldId}>
                            {choice.option}
                          </label>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>

            <br />

            <Button onClick={next} name="nextButton" disabled={!isRadioChecked}>
              {currentQuestionIndex + 1 < questions?.length ? "Next" : "Finish"}
            </Button>

            <br />
            <Timer onTimerUpdate={handleTimerUpdate} />
          </Card.Body>
        </Card>
      )}
      {isFinish && (
        <Card className="Trivia">
          <Card.Body>
            <Card.Title>Thank you for playing.
             <p>Your Score</p></Card.Title>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {questionAnswers &&
                  questionAnswers.map((answer, index) => {
                    return (
                      <tr>
                        <td className={getClass(answer.isCorrect)}>{questions[index].question}</td>
                        <td className={getClass(answer.isCorrect)}>{answer.option}</td>
                        <td className={getClass(answer.isCorrect)}>{answer.isCorrect ? "Correct" : "Incorrect"}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Total Score</th>
                  <th scope="col">Total Time</th>
                </tr>
                <tr>
                  <th scope="col">{name}</th>
                  <th scope="col">{scoreData?.score}</th>
                  <th scope="col">{timerValue} seconds</th>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      )}
    </Row>
  );
};

export default TriviaComponent;
