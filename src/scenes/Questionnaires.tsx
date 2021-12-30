import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TQuestionary } from '@/models/questionary';
import { QuestionaryCard, Spinner } from '@/components';
import styled from 'styled-components';
import { Theme } from '../utils/theme';

const MainContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const TopHeading = styled.div`
  margin-top: 1rem;
  background-color: ${Theme.color.primaryDark};
  height: 10px;
`;

const GameTitle = styled.div`
  margin-top: 1rem;
  color: ${Theme.color.primary};
  font-size: xxx-large;
  font-weight: 800;
`;

const Subtitle = styled.h3`
  background-color: ${Theme.color.primaryLight};
  color: white;
  padding: 1rem;
`;

const QuestionnairesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: -5px;
`;

export const Questionnaires = () => {
  const [loading, setLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<TQuestionary[] | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<{ questionnaires: TQuestionary[] }>(
          `/api/questionary`,
        );
        setQuestionnaires(data.questionnaires);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <MainContainer>
      <TopHeading />
      <GameTitle>Trivia</GameTitle>
      <Subtitle>Questionnaires</Subtitle>
      {loading && <Spinner />}
      <QuestionnairesContainer>
        {!loading &&
          questionnaires?.map((q) => <QuestionaryCard key={q.id} {...q} />)}
      </QuestionnairesContainer>
    </MainContainer>
  );
};
