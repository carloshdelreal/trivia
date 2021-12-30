import { TriviaMainContainer } from '@/components';
import { useRouter } from 'next/router';

const TriviaGame = () => {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <TriviaMainContainer subtitle={`Game`}>
      <p>GameId: {gameId}</p>
    </TriviaMainContainer>
  );
};

export default TriviaGame;
