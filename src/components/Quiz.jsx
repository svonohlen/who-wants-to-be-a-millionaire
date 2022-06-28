import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/src_sounds_play.mp3";
import correct from "../sounds/src_sounds_correct.mp3";
import wrong from "../sounds/src_sounds_wrong.mp3";

const Quiz = ({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  fiftyJoker,
  setFiftyJoker,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  //sound will only start after user interacted with page (e.g. click) in chrome as per googles autoplay policy in chrome

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    setFiftyJoker(false);
  }, [questionNumber, setFiftyJoker]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  }; //3 seconds after selection check if answer is correct is performed

  let counter = 0;
  const answerDisplay = (a) => {
    if (fiftyJoker && counter < 2 && !a.correct) {
      counter++;
      return " ";
    } else {
      return a.text;
    }
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {answerDisplay(a)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

// props which were added in app.jsx to quiz component, need to be added here as well
