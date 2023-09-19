import { useMemo } from 'react';
import classes from './Stopwatch.module.css';

export default function Stopwatch(props) {
  const time = props.gameTime;

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor(time / 1000 - minutes * 60);

  const miliseconds = useMemo(() => {
    const milisecString = time.toString().slice(-3);
    const milisec = parseInt(milisecString);
    if (milisec === 0) {
      return `000`;
    } else if (milisec < 10) {
      return `00${milisec}`;
    } else if (milisec < 100) {
      return `0${milisec}`;
    } else {
      return milisec;
    }
  }, [time]);

  return (
    <div className={classes.stopwatchStyle}>
      <p className={classes.boxTitle}>{props.boxName}</p>
      <div>
        <span className={classes.minAndSecBox}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </span>
        <span>:</span>
        <span className={classes.minAndSecBox}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <span>:</span>
        <span className={classes.milisecBox}>{miliseconds}</span>
      </div>
    </div>
  );
}
