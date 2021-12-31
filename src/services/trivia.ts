import { Answer, Game, TGame } from '@/models/game';
import {
  QuestionsModel,
  Question,
  PublicQuestion,
  NewQuestion,
} from '@/models/question';
import { TQuestionary, Questionary } from '@/models/questionary';
import { GameSummaryResponses } from '@/common';

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

  getQuestionary(id: string): TQuestionary | undefined {
    return Questionary.getInstance().getQuestionary(id);
  }

  async getQuestionnaireQuestions(
    questionnaireId: string,
  ): Promise<PublicQuestion[] | null> {
    const questionary =
      Questionary.getInstance().getQuestionary(questionnaireId);
    if (questionary) {
      const questions = Promise.all(
        questionary?.questions.map((q) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { correctAnswer, ...question } =
            QuestionsModel.getInstance().getQuestion(q);
          return question;
        }),
      );
      return questions;
    }

    return null;
  }

  createQuestionary(questions: string[], subject: string[]): TQuestionary {
    return Questionary.getInstance().createQuestionary(questions, subject);
  }

  addQuestion(questionaryId: string, questionId: string): TQuestionary | null {
    return Questionary.getInstance().addQuestion(questionaryId, questionId);
  }

  createGame(questionary_id: string): TGame | null {
    const questionary =
      Questionary.getInstance().getQuestionary(questionary_id);
    if (questionary) {
      return Game.getInstance().createGame(
        questionary_id,
        questionary.questions.length,
      );
    }

    return null;
  }

  updateAnswers(game_id: string, answers: Answer[]): TGame | null {
    return Game.getInstance().updateAnswers(game_id, answers);
  }

  gameExists(game_id: string): boolean {
    if (Game.getInstance().getGame(game_id)) return true;
    return false;
  }

  gameFinished(game_id: string): boolean {
    if (Game.getInstance().gameFinished(game_id)) {
      return true;
    }

    return false;
  }

  endGame(game_id: string): TGame | null {
    return Game.getInstance().endGame(game_id);
  }

  summaryGame(game_id: string): TGame | GameSummaryResponses {
    const game = Game.getInstance().getGame(game_id);

    // the game does not exist
    if (game === null) return GameSummaryResponses.GAME_DOES_NOT_EXIST;

    // if game is in progress
    if (!this.gameFinished(game_id))
      return GameSummaryResponses.GAME_IN_PROGRESS;

    // if there is score summaryGame has been already runned
    if (game.score !== null) {
      return game;
    }

    const results = game.answers.reduce(
      (acc, a) => {
        const correct = this.verifyQuestion(a.question_id, a.answer);
        if (correct === true) {
          acc.correctAnswers += 1;
        }
        acc.answers.push({
          ...a,
          correct: correct ? true : false,
        });

        return acc;
      },
      { answers: [], correctAnswers: 0 } as {
        answers: Answer[];
        correctAnswers: number;
      },
    );

    const score =
      results.correctAnswers > 0
        ? results.correctAnswers / results.answers.length
        : 0;

    return Game.getInstance().summarize(
      game_id,
      results.answers,
      results.correctAnswers,
      score,
    );
  }
}

const triviaInstance = new Trivia();

export { triviaInstance as Trivia };
