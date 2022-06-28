import { useEffect, useState } from "react";

//The argument a React function component receives is its props, which is an object with named properties for each of the properties. So setStop e.g. is not just setStop but props.setStop. therefore object.destructuring

export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) {
      setStop(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000); //every 1 second function is going to decrease timer by one sec
    return () => clearInterval(interval); //The global clearInterval method cancels a timed, repeating action which was previously established by a call to setInterval. if in this case not cancelled timer doesnt work properly
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
