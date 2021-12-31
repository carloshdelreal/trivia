import React, { useEffect, useState } from 'react';
import {
  Spinner,
  TriviaMainContainer,
  TriviaGame,
  QuestionArray,
} from '@/components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TGame } from '@/models/game';
import { PublicQuestion } from '@/models/question';

const Game = () => {
  const router = useRouter();
  const { questionaireId } = router.query;

  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [game, setGame] = useState<TGame | null>(null);
  const [questions, setQuestions] = useState<PublicQuestion[] | null>(null);

  // create game
  useEffect(() => {
    if (!questionaireId) return;
    (async () => {
      setLoadingGame(true);
      try {
        const { data } = await axios.post(`/api/game`, {
          questionary_id: questionaireId,
        });
        setGame(data.game);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingGame(false);
    })();
  }, [questionaireId]);

  // get questions
  useEffect(() => {
    if (!questionaireId) return;
    (async () => {
      setLoadingQuestions(true);
      try {
        const { data } = await axios.get(`/api/questions/${questionaireId}`);
        setQuestions(data.questions);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingQuestions(false);
    })();
  }, [questionaireId]);

  return (
    <TriviaMainContainer subtitle={`Game`}>
      {loadingGame && <Spinner />}
      {!loadingGame && game && <TriviaGame {...game} />}
      {!loadingQuestions && questions && game && (
        <QuestionArray questions={questions} gameId={game.id} />
      )}
    </TriviaMainContainer>
  );
};

export default Game;
