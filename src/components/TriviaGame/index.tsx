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
  display: block;
  margin: 0;
  padding: 0;
`;

const CountDown = styled(Timer)`
  justify-content: end;
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Time = styled.span`
  color: ${Theme.color.primary};
  font-size: larger;
`;

const TimeIsUpTitle = styled.span`
  color: ${Theme.color.primary};
  font-size: larger;
`;

const YouCan = styled.span`
  color: ${Theme.color.primaryLight};
  animation: glow 1s infinite;

  @keyframes glow {
    from {
      color: ${Theme.color.primaryLight};
    }

    to {
      color: ${Theme.color.primary};
    }
  }
`;

const Perfect = styled.span`
  color: green;
  animation: glow 1s infinite;

  @keyframes glow {
    from {
      color: green;
    }

    to {
      color: ${Theme.color.primary};
    }
  }
`;
interface GameOver {
  gameOver: () => void;
  gameOverFlag: boolean;
}

export const TriviaGame: React.FC<TGame & GameOver> = ({
  id,
  correctAnswers,
  score,
  due,
  gameOver,
  gameOverFlag,
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

  useEffect(() => {
    if (gameOverFlag) {
      setTimeIsUp(true);
    }
  }, [gameOverFlag]);

  return (
    <TimerContainer>
      <FlexContainer>
        <Timer>GameId: {id}</Timer>
        <CountDown>
          {!gameOverFlag && (
            <Time>
              {time} {!timeIsUp && <span> s</span>}
            </Time>
          )}
          {timeIsUp && <TimeIsUpTitle>&nbsp;Time is up!</TimeIsUpTitle>}
        </CountDown>
      </FlexContainer>
      {correctAnswers ? <Timer>Correct answers: {correctAnswers}</Timer> : null}
      {score ? (
        <Timer>
          Score: {score}
          {score === 1 ? (
            <Perfect> Perfect!!</Perfect>
          ) : (
            <YouCan> You can do it better</YouCan>
          )}
        </Timer>
      ) : null}
    </TimerContainer>
  );
};
