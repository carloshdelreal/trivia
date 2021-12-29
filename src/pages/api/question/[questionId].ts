import {
  handleDeleteQuestion,
  handleGetQuestion,
  handleVerifyQuestion,
} from '@/handlers/question';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler, ErrorType } from '../../../utils/errors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `GET`) {
    return handleGetQuestion(req, res);
  }

  if (req.method === `DELETE`) {
    return handleDeleteQuestion(req, res);
  }

  if (req.method === `POST`) {
    return handleVerifyQuestion(req, res);
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};

export default handler;
