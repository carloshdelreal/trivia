import React, { useState } from 'react';
import { TQuestionary } from '@/models/questionary';
import { QuestionaryCard } from '@/components/QuestionaryCard';

export const Questionnaires = () => {
  // get questionnaires
  const [questionnaires, setquestionnaires] = useState<TQuestionary[] | null>(
    null,
  );
  return (
    <div>
      <h1>Trivia</h1>
      <h3>Questionnaires</h3>
      {questionnaires?.map((q) => (
        <QuestionaryCard
          key={q.id}
          id={q.id}
          questions={[]}
          subject={[]}
          name={``}
        />
      ))}
      <QuestionaryCard id={`123`} questions={[]} subject={[]} name={`Cool`} />
    </div>
  );
};
