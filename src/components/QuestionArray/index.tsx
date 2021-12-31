import React, { useState } from 'react';
import { PublicQuestion } from '@/models/question';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';
import { QuestionComponent } from '../QuestionComponent';
import { Answer } from '@/models/game';
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
}

export const QuestionArray: React.FC<IQuestionArray> = ({
  questions,
  gameId,
}) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitingAnswers, setSubmitingAnswers] = useState(false);

  const selectAnswer = (question_id: string, answer: string) => {
    const newState = { ...answers };
    newState[question_id] = { question_id, answer };
    setAnswers(newState);
  };

  const submitAnswers = async () => {
    setSubmitingAnswers(true);
    try {
      const { data } = await axios.post(`/api/game/${gameId}`, {
        answers: Object.values(answers),
      });
    } catch (error) {
      console.error(error.message);
    }
    setSubmitingAnswers(false);
  };
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
          />
        ))}
      </div>
      <ButtonContainer>
        <ButtonPrimary onClick={() => submitAnswers()}>
          Submit Questions
        </ButtonPrimary>
        <ButtonSecondary>End Game</ButtonSecondary>
      </ButtonContainer>
    </QuestionArrayContainer>
  );
};
