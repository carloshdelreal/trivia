import { TQuestionary } from '@/models/questionary';
import React, { useState } from 'react';

export const QuestionaryCard: React.FC<TQuestionary> = ({ id }) => {
  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};
