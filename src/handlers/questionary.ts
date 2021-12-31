import { Trivia } from '@/services/trivia';
import { errorHandler, ErrorType } from '@/utils/errors';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * get questionnaires
 */
export const handleGetQuestionnaires = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const questionnaires = Trivia.getQuestionnaires();
  return res.status(200).json({ questionnaires });
};

/**
 * get questionary
 */
export const handleGetQuestionary = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const id = req.query?.id?.toString();
  const questionary = Trivia.getQuestionary(id);
  if (questionary) {
    return res.status(200).json(questionary);
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};
