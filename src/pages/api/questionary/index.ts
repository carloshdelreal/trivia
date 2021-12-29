import { handleGetQuestionnaires } from '@/handlers/questionary';
import { errorHandler, ErrorType } from '@/utils/errors';
import type { NextApiRequest, NextApiResponse } from 'next';

const resolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `GET`) {
    return handleGetQuestionnaires(req, res);
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};

export default resolver;
