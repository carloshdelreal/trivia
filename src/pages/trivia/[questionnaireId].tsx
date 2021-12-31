import React, { useEffect, useState } from 'react';
import {
  Spinner,
  TriviaMainContainer,
  TriviaGame,
  QuestionArray,
  Questionary,
} from '@/components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TGame } from '@/models/game';
import { PublicQuestion } from '@/models/question';
import { TQuestionary } from '@/models/questionary';
import styled, { css } from 'styled-components';
import { Theme } from '../../utils/theme';

const GameSummaryBtn = styled.button`
  background-color: ${Theme.color.primary};
  border: none;
  color: white;
  padding: 1rem;
  margin: 1rem;
  margin-bottom: 0;

  @keyframes glowSummary {
    from {
      background-color: ${Theme.color.primaryLight};
    }

    to {
      background-color: ${Theme.color.primary};
    }
  }
  ${(props: { clicked: boolean }) =>
    !props.clicked &&
    css`
      animation: glowSummary 1s infinite;
    `}
`;

const Game = () => {
  const router = useRouter();
  const { questionnaireId } = router.query;

  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingQuestionary, setLoadingQuestionary] = useState(true);
  const [gameOverFlag, setGameOverFlag] = useState(false);

  const [game, setGame] = useState<TGame | null>(null);
  const [questions, setQuestions] = useState<PublicQuestion[] | null>(null);
  const [summary, setSummary] = useState<TGame | null>(null);
  const [questionary, setQuestionary] = useState<TQuestionary | null>(null);

  const startGame = () => {
    // create game
    setSummary(null);
    setGameOverFlag(false);
    if (!questionnaireId) return;
    (async () => {
      setLoadingGame(true);
      try {
        const { data } = await axios.post(`/api/game`, {
          questionary_id: questionnaireId,
        });
        setGame(data.game);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingGame(false);
    })();
  };

  const getGameSummary = async () => {
    if (!game) return;
    try {
      const { data } = await axios.get<{ game: TGame }>(`/api/game/${game.id}`);
      setSummary(data.game);
      setGame(data.game);
    } catch (error) {
      console.error(error.message);
    }
  };

  const gameOver = () => {
    setGameOverFlag(true);
  };

  const endGame = async () => {
    if (!game) return;
    try {
      await axios.delete(`/api/game/${game.id}`);
      gameOver();
    } catch (error) {
      console.error(error.message);
    }
  };

  // get questionnaire
  useEffect(() => {
    if (!questionnaireId) return;
    (async () => {
      setLoadingQuestionary(true);
      try {
        const { data } = await axios.get<TQuestionary>(
          `/api/questionary/${questionnaireId}`,
        );
        setQuestionary(data);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingQuestionary(false);
    })();
  }, [questionnaireId]);

  // get questions
  useEffect(() => {
    if (!questionnaireId) return;
    (async () => {
      setLoadingQuestions(true);
      try {
        const { data } = await axios.get(`/api/questions/${questionnaireId}`);
        setQuestions(data.questions);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingQuestions(false);
    })();
  }, [questionnaireId]);

  if (loadingQuestions || loadingQuestionary) return <Spinner />;

  return (
    <TriviaMainContainer subtitle={`Game`}>
      {questionary && <Questionary {...questionary} startGame={startGame} />}
      {!loadingGame && game && (
        <TriviaGame {...game} gameOver={gameOver} gameOverFlag={gameOverFlag} />
      )}
      {gameOverFlag && (
        <GameSummaryBtn
          onClick={() => getGameSummary()}
          clicked={summary !== null}
        >
          Game Summary
        </GameSummaryBtn>
      )}
      {questions && game && (
        <QuestionArray
          questions={questions}
          gameId={game.id}
          gameOverFlag={gameOverFlag}
          summary={summary}
          endGame={endGame}
        />
      )}
    </TriviaMainContainer>
  );
};

export default Game;
