import type { NextApiResponse } from 'next';

export enum ErrorType {
  CAN_NOT_DELETE = `CAN_NOT_DELETE`,
  NOT_FOUND = `NOT_FOUND`,
  BAD_REQUEST = `BAD_REQUEST`,
  GAME_DOES_NOT_EXIST = `GAME_DOES_NOT_EXIST`,
  FINISHED = `FINISHED`,
  GAME_IN_PROGRESS = `GAME_IN_PROGRESS`,
}
type error = {
  error: number;
  message: string;
};

const errors: Record<ErrorType, error> = {
  CAN_NOT_DELETE: {
    error: 409,
    message: `the requested object could not be deleted`,
  },
  NOT_FOUND: {
    error: 405,
    message: `the resource you are trying to get does no exists`,
  },
  GAME_DOES_NOT_EXIST: {
    error: 404,
    message: `the  game your are looking for does not exist`,
  },
  FINISHED: {
    error: 404,
    message: `the  game your are looking for has finished`,
  },
  BAD_REQUEST: {
    error: 404,
    message: `the fields of the entity you are creating don't correspond`,
  },
  GAME_IN_PROGRESS: { error: 405, message: `the game is in progress` },
};

export const errorHandler = (errorType: ErrorType, req: NextApiResponse) => {
  const { error, message } = errors[errorType];
  return req.status(error).json({ message });
};
