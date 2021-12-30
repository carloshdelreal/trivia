import { Trivia } from '@/services/trivia';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler, ErrorType } from '../utils/errors';

/**
 * create game handler, it takes questionary_id from body
 */
export const handleCreateGame = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { questionary_id } = req.body;
  const game = Trivia.createGame(questionary_id);
  if (game) {
    return res.status(200).json({ game });
  }

  return errorHandler(ErrorType.BAD_REQUEST, res);
};

/**
 * handle update answers
 */
export const handleUpdateAnswers = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const gameId = req.query?.gameId?.toString();
  const { answers } = req.body;
  const game = Trivia.updateAnswers(gameId, answers);
  if (game) {
    return res.status(200).json({ game });
  }

  return errorHandler(ErrorType.BAD_REQUEST, res);
};

export const handlerGameSummary = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const gameId = req.query?.gameId?.toString();
  const game = Trivia.summaryGame(gameId);
  if (game) {
    return res.status(200).json({ game });
  }

  return errorHandler(ErrorType.BAD_REQUEST, res);
};
