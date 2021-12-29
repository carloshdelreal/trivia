import type { NextApiRequest, NextApiResponse } from 'next';

enum QuestionType {
  SINGLE_CHOICE = `SINGLE_CHOICE`,
  OPEN_QUESTION = `OPEN_QUESTION`,
  MULTI_CHOICE = `MULTI_CHOICE`,
  TRUE_FALSE = `TRUE_FALSE`,
}

type Question = {
  id: string;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  choices: string;
};

type PublicQuestion = Omit<Question, 'correctAnswer'>;

const QuestionsDB: Record<string, Question> = {
  '111': {
    id: `111`,
    type: QuestionType.SINGLE_CHOICE,
    question: `Which is the capital of the US`,
    correctAnswer: `washingtong`,
    choices: JSON.stringify([`washingtong`, `los angeles`, `new york`]),
  },
  '222': {
    id: `222`,
    type: QuestionType.SINGLE_CHOICE,
    question: `Which is the biggest country of the world`,
    correctAnswer: `rusia`,
    choices: JSON.stringify([`canada`, `us`, `rusia`]),
  },
  '333': {
    id: `333`,
    type: QuestionType.SINGLE_CHOICE,
    question: `which is the longest river in the world`,
    correctAnswer: `amazon river`,
    choices: JSON.stringify([`amazon river`, `nile river`, `yangtze river`]),
  },
};

const resolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `GET`) {
    const questions: PublicQuestion[] = Object.values(QuestionsDB).map(
      ({ id, type, question, choices }) => ({ id, type, question, choices }),
    );
    res.status(200).json({ questions });
  }
};

export default resolver;
