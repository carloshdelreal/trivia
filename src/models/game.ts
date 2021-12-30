import { guid } from '@/utils/uuid';

export type Answer = {
  question_id: string;
  answer: string;
  correct?: boolean;
};

export type TGame = {
  id: string;
  questionary_id: string;
  answers: Answer[];
  correctAnswers: number | null;
  score: number | null;
  due: Date;
};

export type TGamesDB = Record<string, TGame>;

export class Game {
  private static instance: Game;
  games: TGamesDB;

  constructor() {
    this.games = {};
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  gameFinished(game_id: string): boolean | null {
    const now = new Date();
    const game = this.games[game_id];
    if (game) {
      return this.games[game_id]?.due < now;
    }

    return null;
  }

  createGame(questionary_id: string, questionsNumber: number): TGame {
    const id = guid();
    const now = new Date();
    this.games[id] = {
      id,
      questionary_id,
      answers: [],
      correctAnswers: null,
      score: null,
      due: new Date(now.getTime() + 1000 * 5 * questionsNumber),
    };

    return this.games[id];
  }

  updateAnswers(game_id: string, answers: Answer[]): TGame | null {
    if (!this.gameFinished(game_id)) {
      this.games[game_id] = {
        ...this.games[game_id],
        answers,
      };
      return this.games[game_id];
    }

    return null;
  }

  getAnswers(game_id: string): Answer[] | null {
    if (this.gameFinished(game_id)) {
      return this.games[game_id].answers;
    }

    return null;
  }

  summarize(
    game_id: string,
    answers: Answer[],
    correctAnswers: number,
    score: number,
  ): TGame {
    const game = {
      ...this.games[game_id],
      answers,
      correctAnswers,
      score,
    };

    this.games[game_id] = game;

    return game;
  }

  getScore(game_id: string): number | null {
    const game = this.games[game_id];
    if (game) {
      return game.score;
    }

    return null;
  }

  getGame(game_id: string): TGame | null {
    const game = this.games[game_id];
    if (game) {
      return { ...game };
    }

    return null;
  }

  endGame(game_id: string): TGame | null {
    const game = this.games[game_id];
    if (game) {
      const now = new Date();
      game.due = now;
      return { ...game };
    }
    return null;
  }
}
