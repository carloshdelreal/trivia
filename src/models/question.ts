import { guid } from '@/utils/uuid';

export enum QuestionType {
  SINGLE_CHOICE = `SINGLE_CHOICE`,
  OPEN_QUESTION = `OPEN_QUESTION`,
  MULTI_CHOICE = `MULTI_CHOICE`,
  TRUE_FALSE = `TRUE_FALSE`,
}

export type Question = {
  id: string;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  choices: string;
};

export type PublicQuestion = Omit<Question, 'correctAnswer'>;
export type NewQuestion = Omit<Question, 'id'>;

export type TQuestionDB = Record<string, Question>;

export class QuestionsModel {
  private static instance: QuestionsModel;
  questionsDB: TQuestionDB;

  constructor() {
    this.questionsDB = {
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
        choices: JSON.stringify([
          `amazon river`,
          `nile river`,
          `yangtze river`,
        ]),
      },
    };
  }

  public static getInstance(): QuestionsModel {
    if (!QuestionsModel.instance) {
      QuestionsModel.instance = new QuestionsModel();
    }

    return QuestionsModel.instance;
  }

  getQuestions(): PublicQuestion[] {
    return Object.values(this.questionsDB).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ correctAnswer, ...rest }) => rest,
    );
  }

  getQuestion(id: string): Question {
    return this.questionsDB[id];
  }

  createQuestion(question: NewQuestion) {
    const id = guid();
    this.questionsDB[id] = { id, ...question };
    return this.questionsDB[id];
  }

  deleteQuestion(id: string): boolean {
    return delete this.questionsDB[id];
  }
}
