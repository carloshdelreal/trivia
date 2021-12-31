import { TGame } from '@/models/game';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';

const TimerContainer = styled.div`
  padding: 1rem;
`;

const Timer = styled.h3`
  background-color: white;
  color: black;
  padding: 1rem;
  display: flex;
  margin: 0;
  padding: 0;
`;

const CountDown = styled(Timer)`
  justify-content: end;
`;

const Time = styled.span`
  color: ${Theme.color.primary};
  font-size: larger;
`;

interface GameOver {
  gameOver: () => void;
}

export const TriviaGame: React.FC<TGame & GameOver> = ({
  id,
  correctAnswers,
  score,
  due,
  gameOver,
}) => {
  const getRemainingSeconds = useCallback((): number => {
    return Math.ceil((new Date(due).getTime() - new Date().getTime()) / 1000);
  }, [due]);

  const [time, setTime] = useState(getRemainingSeconds());

  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    if (timeIsUp) {
      gameOver();
      return;
    }
    const timer = setTimeout(() => {
      setTime(getRemainingSeconds());
    }, 1000);

    if (time === 0) setTimeIsUp(true);

    return () => {
      clearTimeout(timer);
    };
  }, [due, gameOver, getRemainingSeconds, time, timeIsUp]);

  return (
    <TimerContainer>
      <Timer>GameId: {id}</Timer>
      {correctAnswers ?? <Timer>{correctAnswers}</Timer>}
      {score ?? <Timer>{score}</Timer>}
      <CountDown>
        <Time>
          {time} {!timeIsUp && <span> s</span>}
        </Time>
        {timeIsUp && <span>&nbsp;Time is up!</span>}
      </CountDown>
    </TimerContainer>
  );
};
