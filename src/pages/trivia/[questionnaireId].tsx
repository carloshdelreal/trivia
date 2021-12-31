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
    } catch (error) {
      console.error(error.message);
    }
  };

  const gameOver = () => {
    setGameOverFlag(true);
    console.log(`game over`);
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
      {gameOverFlag && (
        <button onClick={() => getGameSummary()}> Game Summary</button>
      )}
      {questionary && <Questionary {...questionary} startGame={startGame} />}
      {!loadingGame && game && <TriviaGame {...game} gameOver={gameOver} />}
      {questions && game && (
        <QuestionArray
          questions={questions}
          gameId={game.id}
          gameOverFlag={gameOverFlag}
          summary={summary}
        />
      )}
    </TriviaMainContainer>
  );
};

export default Game;
