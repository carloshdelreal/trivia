import { Trivia } from '@/services/trivia';
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
