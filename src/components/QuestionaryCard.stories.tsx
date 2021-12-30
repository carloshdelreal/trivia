import { TQuestionary } from '@/models/questionary';
import { Story } from '@storybook/react';
import React from 'react';

import { QuestionaryCard } from './QuestionaryCard';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: QuestionaryCard,
  title: `Questionary Card`,
};

const Template: Story<TQuestionary> = (args) => <QuestionaryCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: `1235jhkllj4`,
};
