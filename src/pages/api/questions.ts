import type { NextApiRequest, NextApiResponse } from 'next';
import { QuestionsModel } from '../../models/question';

const resolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `GET`) {
    const questions = QuestionsModel.getInstance().getQuestions();
    res.status(200).json({ questions });
  }
};

export default resolver;
