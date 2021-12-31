import React, { useEffect, useState } from 'react';
import { PublicQuestion } from '@/models/question';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';
import { QuestionComponent } from '../QuestionComponent';
import { Answer, TGame } from '@/models/game';
import axios from 'axios';

const QuestionArrayContainer = styled.div`
  padding: 1rem;
`;

const QuestionsTitle = styled.h3`
  background-color: ${Theme.color.primaryDark};
  color: white;
  padding: 1rem;
`;

const ButtonPrimary = styled.button`
  background-color: ${Theme.color.primaryDark};
  color: white;
  padding: 1rem;
  margin: 0 5px;
  border: none;
`;

const ButtonSecondary = styled.button`
  background-color: ${Theme.color.primaryLight};
  color: white;
  padding: 1rem;
  margin: 0 5px;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 -5px;
`;

interface IQuestionArray {
  questions: PublicQuestion[];
  gameId: string;
  gameOverFlag: boolean;
  summary: TGame | null;
  endGame: () => void;
}

export const QuestionArray: React.FC<IQuestionArray> = ({
  questions,
  gameId,
  gameOverFlag,
  summary,
  endGame,
}) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<string, Answer>
  >({});
  const [submitingAnswers, setSubmitingAnswers] = useState(false);

  const selectAnswer = (question_id: string, answer: string) => {
    if (gameOverFlag) return;
    const newState = { ...answers };
    newState[question_id] = { question_id, answer };
    setAnswers(newState);
  };

  const submitAnswers = async () => {
    setSubmitingAnswers(true);
    try {
      const { data } = await axios.post<{ game: TGame }>(
        `/api/game/${gameId}`,
        {
          answers: Object.values(answers),
        },
      );

      setSubmittedAnswers(
        data.game.answers.reduce((acc, curr: Answer) => {
          acc[curr.question_id] = curr;
          return acc;
        }, {} as Record<string, Answer>),
      );
    } catch (error) {
      console.error(error.message);
    }
    setSubmitingAnswers(false);
  };

  // Clear answers after game start
  useEffect(() => {
    if (!gameOverFlag) {
      setAnswers({});
      setSubmittedAnswers({});
    }
  }, [gameOverFlag]);

  // Game summary adds correct answers
  useEffect(() => {
    if (summary) {
      const newState = { ...answers };
      summary.answers.forEach((q) => {
        newState[q.question_id] = q;
      });
      setAnswers(newState);
    }
  }, [summary]);
  return (
    <QuestionArrayContainer>
      <QuestionsTitle>Questions</QuestionsTitle>
      <div>
        {questions?.map((q) => (
          <QuestionComponent
            key={q.id}
            {...q}
            selectedChoice={answers[q.id]?.answer}
            setSelectedChoice={selectAnswer}
            submittedChoice={submittedAnswers[q.id]?.answer}
            correct={answers[q.id]?.correct}
          />
        ))}
      </div>
      {!gameOverFlag && (
        <ButtonContainer>
          {!submitingAnswers && (
            <ButtonPrimary onClick={() => submitAnswers()}>
              Submit Questions
            </ButtonPrimary>
          )}
          <ButtonSecondary onClick={() => endGame()}>End Game</ButtonSecondary>
        </ButtonContainer>
      )}
    </QuestionArrayContainer>
  );
};
