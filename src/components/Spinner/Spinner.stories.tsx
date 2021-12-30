import { Story } from '@storybook/react';
import React from 'react';

import { Spinner } from './Spinner';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Spinner,
  title: `Spinner`,
};

const Template: Story = () => <Spinner />;

export const Default = Template.bind({});
Default.args = {};
