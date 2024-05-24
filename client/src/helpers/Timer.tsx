import { FunctionComponent, useState, useEffect } from "react";

type TimerProps = {
  onTimerUpdate : (timer : number) => void;
}
  
const Timer: FunctionComponent<TimerProps> = ({onTimerUpdate}) => {
  const [timer, setTimer] = useState<number>(0);
  

  useEffect(() => {
    let timeoutId: number;

    const updateTimer = () => {
      setTimer(prevTimer => prevTimer + 1);
      timeoutId = setTimeout(updateTimer, 1000);
    };

    updateTimer();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    onTimerUpdate(timer);
  }, [timer, onTimerUpdate]);

  return (
    <div>
      <p>Timer: {timer}</p>
    </div>
  );
};

export default Timer;