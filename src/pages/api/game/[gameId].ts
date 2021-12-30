import {
  handleUpdateAnswers,
  handlerGameSummary,
  handlerEndGame,
} from '@/handlers/game';
import { errorHandler, ErrorType } from '@/utils/errors';
import type { NextApiRequest, NextApiResponse } from 'next';

const resolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `POST`) {
    return handleUpdateAnswers(req, res);
  }

  if (req.method === `GET`) {
    return handlerGameSummary(req, res);
  }

  if (req.method === `DELETE`) {
    return handlerEndGame(req, res);
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};

export default resolver;
