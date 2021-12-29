import {
  QuestionsModel,
  Question,
  PublicQuestion,
  NewQuestion,
} from '@/models/question';
import { TQuestionary, Questionary } from '@/models/questionary';

class Trivia {
  getQuestion(questionId: string): Question {
    return QuestionsModel.getInstance().getQuestion(questionId);
  }

  getQuestions(): PublicQuestion[] {
    return QuestionsModel.getInstance().getQuestions();
  }

  deleteQuestion(questionId: string): boolean {
    const question = QuestionsModel.getInstance().getQuestion(questionId);
    if (question) {
      QuestionsModel.getInstance().deleteQuestion(questionId);
      return true;
    }
    return false;
  }

  createQuestion(question: NewQuestion): Question {
    return QuestionsModel.getInstance().createQuestion(question);
  }

  verifyQuestion(questionId: string, answer: string): boolean | null {
    const question = QuestionsModel.getInstance().getQuestion(questionId);
    if (question) {
      return question.correctAnswer === answer;
    }
    return null;
  }

  getQuestionnaires(): TQuestionary[] {
    return Questionary.getInstance().getQuestionnaires();
  }

  getQuestionary(id: string): TQuestionary {
    return Questionary.getInstance().getQuestionary(id);
  }

  createQuestionary(questions: string[], subject: string[]): TQuestionary {
    return Questionary.getInstance().createQuestionary(questions, subject);
  }

  addQuestion(questionaryId: string, questionId: string): TQuestionary | null {
    return Questionary.getInstance().addQuestion(questionaryId, questionId);
  }
}

const triviaInstance = new Trivia();

export { triviaInstance as Trivia };
