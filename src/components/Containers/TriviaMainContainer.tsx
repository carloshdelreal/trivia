import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Subtitle } from '..';
import { Theme } from '../../utils/theme';

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

const Footer = styled.div`
  height: 50vh;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

interface TMC {
  subtitle: string;
}

export const TriviaMainContainer: React.FC<TMC> = ({ children, subtitle }) => {
  const router = useRouter();
  return (
    <MainContainer>
      <TopHeading />
      <GameTitle onClick={() => router.push(`/trivia`)}>Trivia</GameTitle>
      <Subtitle>{subtitle}</Subtitle>
      {children}
      <Footer> Developed by: Carlos Del Real </Footer>
    </MainContainer>
  );
};
