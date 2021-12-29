import type { NextApiRequest, NextApiResponse } from 'next';
import { QuestionsModel } from '../../../models/question';
import { errorHandler, ErrorType } from '../../../utils/errors';

const handleGetQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const questionId = req.query?.questionId?.toString();
  if (req.method === `GET`) {
    const question = QuestionsModel.getInstance().getQuestion(questionId);
    res.status(200).json({ question });
  }

  if (req.method === `DELETE`) {
    const question = QuestionsModel.getInstance().getQuestion(questionId);
    if (question) {
      QuestionsModel.getInstance().deleteQuestion(questionId);
      res.status(200).json({ questionId });
    }
    errorHandler(ErrorType.CAN_NOT_DELETE, res);
  }
};

export default handleGetQuestion;
