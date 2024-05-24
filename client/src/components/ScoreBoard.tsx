import { FunctionComponent, useEffect, useState } from "react";

import { callApi } from "../helpers/DataRequester";
import { Col } from "react-bootstrap";

export interface IScoreData {
  name: string;
  score: number;
  time: number;
}

const ScoreBoard: FunctionComponent = () => {
  const [scoreData, setScoreData] = useState<IScoreData[]>([]);

  useEffect(() => {
    if (scoreData.length === 0) {
      getScore();
    }
  }, [scoreData]);

  /**
   * function to get score
   */
  const getScore = async () => {
    const scoreConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    callApi("score/getScore", scoreConfig)
      .then((r) => {
        r.json().then((data: any) => {
          setScoreData(data);
        });
      })
      .catch((e) => console.log("Error", e));
  };

  return (
    <Col>
      {/* <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.score}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <br />
      <h1>Top 5 Score</h1>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {scoreData
            .sort((a, b) => {
              // Sort by score in descending order
              if (a.score !== b.score) {
                return b.score - a.score;
              }
              // If scores are equal, sort by time in ascending order
              return a.time - b.time;
            })
            .slice(0, 5) // Take only the top 5 players
            .map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.score}</td>
                <td>{score.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Col>
  );
};

export default ScoreBoard;
