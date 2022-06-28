import useSound from "use-sound";
import play from "../sounds/src_sounds_play.mp3";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

export default function Joker({
  setFiftyJoker,
  setPhoneJoker,
  setJokerFiftyClassName,
  setJokerPhoneClassName,
  jokerFiftyClassName,
  jokerPhoneClassName,
}) {
  const [letsPlay] = useSound(play);
  const handleFiftyClick = () => {
    letsPlay();
    setFiftyJoker(true);
    setJokerFiftyClassName("jokerFiftyButton used");
  };

  const handlePhoneClick = () => {
    letsPlay();
    setPhoneJoker(true);
    setJokerPhoneClassName("jokerPhoneButton used");
  };
  return (
    <div className="buttonContainer">
      <button className={jokerFiftyClassName} onClick={handleFiftyClick}>
        50:50
      </button>
      <button className={jokerPhoneClassName} onClick={handlePhoneClick}>
        <PhoneInTalkIcon />
      </button>
    </div>
  );
}
