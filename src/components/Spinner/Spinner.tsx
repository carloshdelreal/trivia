import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../utils/theme';

const SpinContainer = styled.div`
  position: relative;
  max-width: 60px;
  height: 60px;
  margin: auto;
`;

const SpinnerBall = styled.div`
  width: 50px;
  height: 50px;
  border: solid 5px;
  border-color: ${Theme.color.secondary};
  border-radius: 50%;
`;

const Rotating = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  position: absolute;
  left: calc(50% - 5px);
  top: 0;
  width: 10px;
  height: 30px;
  background: white;
  transform-origin: 50% 100%;
  animation: rotate 1s linear infinite;
`;

export const Spinner = () => (
  <SpinContainer>
    <SpinnerBall></SpinnerBall>
    <Rotating></Rotating>
  </SpinContainer>
);
