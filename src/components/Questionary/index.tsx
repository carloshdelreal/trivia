import { TQuestionary } from '@/models/questionary';
import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';

const Card = styled.div`
  padding: 2rem;
  background-color: ${Theme.color.secondaryLight};
  max-width: 400px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 5px;
  &:hover {
    -webkit-box-shadow: 2px 3px 17px 1px rgba(0, 0, 0, 0.22);
    box-shadow: 2px 3px 17px 1px rgba(0, 0, 0, 0.22);
  }
`;

const Title = styled.h1`
  color: ${Theme.color.primary};
  margin: 0;
`;

const TitleDescription = styled.p`
  font-size: 'small';
  color: ${Theme.color.secondaryDark};
  margin: 0;
`;

const DarkerSpan = styled.span`
  font-size: 'smaller';
  color: ${Theme.color.secondaryDark};
  margin-right: 0.5rem;
`;

const Subject = styled.p`
  color: ${Theme.color.secondaryDark};
  margin: 0;
  text-tranform: capitalize;
`;

const StartGameBtn = styled.button`
  background-color: ${Theme.color.primary};
  border: none;
  color: white;
  padding: 1rem;
  margin: 1rem;
  margin-bottom: 0;
`;

interface IStartGame {
  startGame: () => void;
}

export const Questionary: React.FC<TQuestionary & IStartGame> = ({
  id,
  name = `Default Name`,
  questions,
  subject,
  startGame,
}) => {
  return (
    <Card>
      <Title>{name}</Title>
      <TitleDescription>
        <DarkerSpan>id:</DarkerSpan>
        {id}
      </TitleDescription>
      {subject?.length > 0 && <Subject>{subject.join(`, `)}</Subject>}
      {questions?.length > 0 && <Subject>{questions.join(`, `)}</Subject>}
      <StartGameBtn onClick={() => startGame()}>Start Game</StartGameBtn>
    </Card>
  );
};
