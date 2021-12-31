import { TGame } from '@/models/game';
import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';

export const TriviaGame: React.FC<TGame> = ({ id }) => {
  return <div>{id}</div>;
};
