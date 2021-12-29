import type { NextApiResponse } from 'next';

export enum ErrorType {
  CAN_NOT_DELETE = `CAN_NOT_DELETE`,
  NOT_FOUND = `NOT_FOUND`,
  BAD_REQUEST = `BAD_REQUEST`,
}

export const errorHandler = (error: ErrorType, req: NextApiResponse) => {
  if (error === ErrorType.CAN_NOT_DELETE) {
    return req
      .status(409)
      .json({ message: `the requested object could not be deleted` });
  } else if (error === ErrorType.NOT_FOUND) {
    return req
      .status(404)
      .json({ message: `the resource you are trying to get does no exists` });
  } else if (error === ErrorType.BAD_REQUEST) {
    return req.status(400).json({
      message: `the fields of the entity you are creating don't correspond`,
    });
  }
  return req.status(500);
};
