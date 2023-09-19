import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/Die/Die';
import Stopwatch from './components/Stopwatch/Stopwatch';

export default function App() {
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const [numOfRolls, setNumOfRolls] = useState(0);
  const [stopwatchOn, setStopwatchOn] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [showRecord, setShowRecord] = useState(false);
  const [rollButtonAnimation, setRollButtonAnimation] =
    useState(false);

  const storedTime = localStorage.getItem('bestTime') || '0';
  const parsedTime = JSON.parse(storedTime);
  const [bestTime, setBestTime] = useState(parsedTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stopwatchOn) setGameTime((prevTime) => prevTime + 10);
    }, 10);

    return () => clearInterval(interval);
  }, [stopwatchOn, gameTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rollButtonAnimation) setRollButtonAnimation(false);
    }, 500);

    return () => clearInterval(interval);
  }, [rollButtonAnimation]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(
      (die) => die.value === firstValue
    );
    if (allHeld && allSameValue) {
      setTenzies(true);
      setStopwatchOn(false);
      if (bestTime === 0 || gameTime < bestTime) {
        localStorage.setItem('bestTime', JSON.stringify(gameTime));
        setBestTime(gameTime);
        setShowRecord(true);
      }
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setNumOfRolls((prevNum) => prevNum + 1);
      setStopwatchOn(true);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setNumOfRolls(0);
      setGameTime(0);
      setShowRecord(false);
    }
  }

  function holdDice(id) {
    if (numOfRolls < 1) {
      setRollButtonAnimation(true);
    } else {
      setRollButtonAnimation(false);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id
            ? { ...die, isHeld: !die.isHeld }
            : die;
        })
      );
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it
        at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <div className="btn-container">
        <button
          className={`roll-dice ${
            rollButtonAnimation ? 'rollButtonWiggle' : ''
          }`}
          onClick={rollDice}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <span className={`record ${showRecord ? 'show-record' : ''}`}>
          NEW RECORD
        </span>
      </div>
      <h4>
        You have rolled the dice {numOfRolls}{' '}
        {numOfRolls === 1 ? 'time' : 'times'}
      </h4>
      <div className="gameTimeTrackingContainer">
        <Stopwatch boxName={'Time:'} gameTime={gameTime} />
        <Stopwatch boxName={'Best time:'} gameTime={bestTime} />
      </div>
    </main>
  );
}
