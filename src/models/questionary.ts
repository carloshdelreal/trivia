import { guid } from '@/utils/uuid';
import { Question } from '@/models/question';

type Tag = {
  id: string;
  tag: string;
};

export type TQuestionary = {
  id: string;
  questions: Array<Question['id']>;
  subject: Array<Tag['id']>;
};

type TQuestionaryDB = Record<string, TQuestionary>;

export class Questionary {
  private static instance: Questionary;
  questionnaires: TQuestionaryDB;

  constructor() {
    this.questionnaires = {
      aaa: {
        id: `aaa`,
        questions: [`111`, `222`, `333`],
        subject: [`trivia`],
      },
    };
  }

  public static getInstance(): Questionary {
    if (!Questionary.instance) {
      Questionary.instance = new Questionary();
    }

    return Questionary.instance;
  }

  getQuestionnaires(): TQuestionary[] {
    return Object.values(this.questionnaires);
  }

  getQuestionary(id: string): TQuestionary {
    return this.questionnaires[id];
  }

  createQuestionary(questions: string[], subject: string[]): TQuestionary {
    const id = guid();
    this.questionnaires[id] = {
      id,
      questions,
      subject,
    };

    return this.questionnaires[id];
  }

  addQuestion(questionaryId: string, questionId: string): TQuestionary | null {
    const questionary = this.questionnaires[questionaryId];
    if (questionary) {
      questionary.questions.push(questionId);
      return questionary;
    }
    return null;
  }
}
