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
  const [questionary, setQuestionary] = useState<TQuestionary | null>(null);

  const startGame = () => {
    // create game
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
      {questionary && <Questionary {...questionary} startGame={startGame} />}
      {!loadingGame && game && <TriviaGame {...game} gameOver={gameOver} />}
      {questions && game && (
        <QuestionArray
          questions={questions}
          gameId={game.id}
          gameOverFlag={gameOverFlag}
        />
      )}
    </TriviaMainContainer>
  );
};

export default Game;
