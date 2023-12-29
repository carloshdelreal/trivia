import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TQuestionary } from '@/models/questionary';
import { QuestionaryCard, Spinner } from '@/components';
import styled from 'styled-components';
import { TriviaMainContainer } from '@/components';

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
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <TriviaMainContainer subtitle={`Questionnaires`}>
      {loading && <Spinner />}
      <QuestionnairesContainer>
        {!loading &&
          questionnaires?.map((q) => <QuestionaryCard key={q.id} {...q} />)}
      </QuestionnairesContainer>
    </TriviaMainContainer>
  );
};
