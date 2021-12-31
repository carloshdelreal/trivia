import React, { useMemo, useState } from 'react';
import { PublicQuestion } from '@/models/question';
import styled, { css } from 'styled-components';
import { Theme } from '../../utils/theme';
import { shuffleArray } from '../../utils/array';

const QuestionContainer = styled.div`
  background-color: ${Theme.color.secondaryLight};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 2rem;
`;

const QuestionStyle = styled.div`
  padding: 2rem;
  font-size: large;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ChoicesStyle = styled.div`
  padding-left: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &:hover {
    border: 3px solid lightgray;
  }
  ${(props: { selected: boolean }) =>
    props.selected &&
    css`
      background-color: lightgrey;
    `}
  ${(props: { submitted: boolean }) =>
    props.submitted &&
    css`
      border: 3px solid;
      border-color: ${Theme.color.primaryLight};
    `}
`;

interface IQuestionComponent {
  selectedChoice: string;
  submittedChoice: string;
  setSelectedChoice: (id: string, c: string) => void;
}

export const QuestionComponent: React.FC<
  PublicQuestion & IQuestionComponent
> = ({
  id,
  question,
  choices,
  selectedChoice,
  submittedChoice,
  setSelectedChoice,
}) => {
  // TODO type could be used to manage other question types
  const choicesArray = useMemo(
    () => shuffleArray(JSON.parse(choices)),
    [choices],
  );
  return (
    <QuestionContainer>
      <QuestionStyle>{question}</QuestionStyle>
      {choicesArray.map((c: string, index: number) => (
        <ChoicesStyle
          key={c}
          onClick={() => setSelectedChoice(id, c)}
          selected={c === selectedChoice}
          submitted={c === submittedChoice}
        >
          {index + 1}. {c}
        </ChoicesStyle>
      ))}
    </QuestionContainer>
  );
};
