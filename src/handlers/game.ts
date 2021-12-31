import { Trivia } from '@/services/trivia';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler, ErrorType } from '../utils/errors';
import { GameSummaryResponses } from '@/common';

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
  if (!Trivia.gameExists(gameId))
    return errorHandler(ErrorType.GAME_DOES_NOT_EXIST, res);

  const game = Trivia.updateAnswers(gameId, answers);
  if (game) {
    return res.status(200).json({ game });
  }

  return errorHandler(ErrorType.FINISHED, res);
};

/**
 * handle end Game
 */
export const handlerEndGame = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const gameId = req.query?.gameId?.toString();
  const game = Trivia.endGame(gameId);
  if (game) {
    return res.status(200).json({ game });
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};

/**
 * handle game summary, game summary can only be retrieved on a finished game aka. due < now
 */
export const handlerGameSummary = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const gameId = req.query?.gameId?.toString();
  const gameResponse = Trivia.summaryGame(gameId);

  if (gameResponse == GameSummaryResponses.GAME_DOES_NOT_EXIST) {
    return errorHandler(ErrorType.GAME_DOES_NOT_EXIST, res);
  } else if (gameResponse == GameSummaryResponses.GAME_IN_PROGRESS) {
    return errorHandler(ErrorType.GAME_IN_PROGRESS, res);
  }

  return res.status(200).json({ game: gameResponse });
};
