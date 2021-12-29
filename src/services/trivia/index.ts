import {
  QuestionsModel,
  Question,
  PublicQuestion,
  NewQuestion,
} from '@/models/question';

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
}

const triviaInstance = new Trivia();

export { triviaInstance as Trivia };
