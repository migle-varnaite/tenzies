import classes from './Die.module.css';
import die1 from '../../assets/images/dice-face-one.svg';
import die2 from '../../assets/images/dice-face-two.svg';
import die3 from '../../assets/images/dice-face-three.svg';
import die4 from '../../assets/images/dice-face-four.svg';
import die5 from '../../assets/images/dice-face-five.svg';
import die6 from '../../assets/images/dice-face-six.svg';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  const dieFaceMap = {
    1: die1,
    2: die2,
    3: die3,
    4: die4,
    5: die5,
    6: die6,
  };

  return (
    <div
      className={classes.die}
      onClick={props.holdDice}
      style={styles}
    >
      <img src={dieFaceMap[props.value]} />
    </div>
  );
}
