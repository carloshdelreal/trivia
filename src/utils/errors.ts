import type { NextApiResponse } from 'next';

export enum ErrorType {
  CAN_NOT_DELETE = `CAN_NOT_DELETE`,
}

export const errorHandler = (error: ErrorType, req: NextApiResponse) => {
  if (error === ErrorType.CAN_NOT_DELETE) {
    req
      .status(409)
      .json({ message: `the requested object could not be deleted` });
  }
  req.status(500);
};
