import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
import Joker from "./components/Joker";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [userName, setUserName] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("CAD 0"); //since in moneypyramid type of amount is string, need to use string here as well
  const [fiftyJoker, setFiftyJoker] = useState(false);
  const [phoneJoker, setPhoneJoker] = useState(false);
  const [jokerFiftyClassName, setJokerFiftyClassName] =
    useState("jokerFiftyButton");
  const [jokerPhoneClassName, setJokerPhoneClassName] =
    useState("jokerPhoneButton");

  const data = [
    {
      id: 1,
      question:
        "Construction of which of these famous landmarks was completed first?",
      answers: [
        {
          text: "Empire State Building",
          correct: false,
        },
        {
          text: "Royal Albert Hall",
          correct: false,
        },
        {
          text: "Eiffel Tower",
          correct: false,
        },
        {
          text: "Big Ben Clock Tower",
          correct: true,
        },
      ],
    },
    {
      id: 2,
      question: "Which of these cetaceans is classified as a “toothed whale”?",
      answers: [
        {
          text: "Gray whale",
          correct: false,
        },
        {
          text: "Minke whale",
          correct: false,
        },
        {
          text: "Sperm whale",
          correct: true,
        },
        {
          text: "Humpback whale",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question:
        "In 1718, which pirate died in battle off the coast of what is now North Carolina?",
      answers: [
        {
          text: "Calico Jack",
          correct: false,
        },
        {
          text: "Blackbeard",
          correct: true,
        },
        {
          text: "Bartholomew Roberts",
          correct: false,
        },
        {
          text: "Captain Kidd",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question:
        "Which toys have been marketed with the phrase “robots in disguise”?",
      answers: [
        {
          text: "Bratz Dolls",
          correct: false,
        },
        {
          text: "Sylvanian Families",
          correct: false,
        },
        {
          text: "Hatchimals",
          correct: false,
        },
        {
          text: "Transformers",
          correct: true,
        },
      ],
    },
    {
      id: 5,
      question:
        "At the closest point, which island group is only 50 miles south-east of the coast of Florida?",
      answers: [
        {
          text: "Bahamas",
          correct: true,
        },
        {
          text: "US Virgin Islands",
          correct: false,
        },
        {
          text: "Turks and Caicos Islands",
          correct: false,
        },
        {
          text: "Bermuda",
          correct: false,
        },
      ],
    },
  ];

  //usememo memorizes result of calling its first argument (function) and if dependency doesnt change returns it each time in order to improve performance

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "CAD 100" },
        { id: 2, amount: "CAD 200" },
        { id: 3, amount: "CAD 300" },
        { id: 4, amount: "CAD 500" },
        { id: 5, amount: "CAD 1000" },
        { id: 6, amount: "CAD 2000" },
        { id: 7, amount: "CAD 4000" },
        { id: 8, amount: "CAD 8000" },
        { id: 9, amount: "CAD 16000" },
        { id: 10, amount: "CAD 32000" },
        { id: 11, amount: "CAD 64000" },
        { id: 12, amount: "CAD 125000" },
        { id: 13, amount: "CAD 250000" },
        { id: 14, amount: "CAD 500000" },
        { id: 15, amount: "CAD 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  useEffect(() => {
    setPhoneJoker(false);
  }, [questionNumber]);

  const phoneJokerDisplay = () => {
    let answer;

    let question = data[questionNumber - 1];
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber >= 3) {
      answer = question.answers.find((answer) => answer.correct === true);
    } else {
      answer = question.answers.find((answer) => answer.correct === false);
    }

    return (
      <div className="phoneJokerAnswerContainer">
        <img
          src="https://www.kindpng.com/picc/m/488-4880430_thinking-monkey-png-transparent-png.png"
          alt="thinking monkey"
        ></img>
        <div className="phoneJokerSpeechBubble sb1 sb5">
          Phew...That's a tough one! I am pretty sure the answer is{" "}
          <span style={{ color: "#1BD49C" }}>"{answer.text}"</span>. No
          guarantee though!!
        </div>
      </div>
    );
  };

  const handlePlayAgain = () => {
    setQuestionNumber(1);
    setStop(false);
    setEarned(0);
    setFiftyJoker(false);
    setPhoneJoker(false);
    setJokerPhoneClassName("jokerPhoneButton");
    setJokerFiftyClassName("jokerFiftyButton");
  };

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <div className="stopContainer">
                <h1 className="endText">You earned: {earned}</h1>
                <button className="playAgainButton" onClick={handlePlayAgain}>
                  Play again
                </button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="phoneJokerDisplay">
                    {phoneJoker ? phoneJokerDisplay() : " "}
                  </div>
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    fiftyJoker={fiftyJoker}
                    setFiftyJoker={setFiftyJoker}
                  />
                </div>
              </> //need to use fragment when enclosing multiple divs
            )}
          </div>

          <div className="pyramid">
            <Joker
              setFiftyJoker={setFiftyJoker}
              jokerFiftyClassName={jokerFiftyClassName}
              setJokerFiftyClassName={setJokerFiftyClassName}
              jokerPhoneClassName={jokerPhoneClassName}
              setJokerPhoneClassName={setJokerPhoneClassName}
              setPhoneJoker={setPhoneJoker}
            />

            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active" //changes color in money pyramid
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
