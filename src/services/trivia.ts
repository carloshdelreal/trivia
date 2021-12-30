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

  gameFinished(game_id: string): boolean {
    if (Game.getInstance().gameFinished(game_id)) {
      return true;
    }

    return false;
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
          correct: true,
        });

        return acc;
      },
      { answers: [], correctAnswers: 0 } as {
        answers: Answer[];
        correctAnswers: number;
      },
    );

    const score = results.correctAnswers / results.answers.length;

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
