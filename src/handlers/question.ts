import { Trivia } from '@/services/trivia';
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler, ErrorType } from '../utils/errors';

/**
 * get question
 */
export const handleGetQuestion = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const questionId = req.query?.questionId?.toString();
  const question = Trivia.getQuestion(questionId);
  if (question) {
    return res.status(200).json({ question });
  }

  return errorHandler(ErrorType.NOT_FOUND, res);
};

/**
 * get questions
 */
export const handleGetQuestions = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const questions = Trivia.getQuestions();
  return res.status(200).json({ questions });
};

/**
 * delete questions
 */
export const handleDeleteQuestion = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const questionId = req.query?.questionId?.toString();
  const question = Trivia.getQuestion(questionId);
  console.log(question);
  if (question) {
    Trivia.deleteQuestion(questionId);
    return res.status(200).json({ questionId });
  }
  return errorHandler(ErrorType.CAN_NOT_DELETE, res);
};

/**
 * create question
 */
export const handleCreateQuestion = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const question = req.body;
  const newQuestion = Trivia.createQuestion(question);
  if (newQuestion) {
    return res.status(200).json({ question: newQuestion });
  }

  return errorHandler(ErrorType.BAD_REQUEST, res);
};

/**
 * verify question, true means correct, false wrong, null means the question does not exist
 */
export const handleVerifyQuestion = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const questionId = req.query?.questionId?.toString();
  const { answer } = JSON.parse(req.body);
  const result = Trivia.verifyQuestion(questionId, answer);

  return res.status(200).json({ result });
};
