import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.query //? [String type]: It's value should be either 'true' or 'false'.

  if (
    !req.originalUrl.includes('/api/cart') &&
    isAdmin !== 'true' &&
    req.method !== 'GET'
  ) {
    return res.status(401).json({
      error: -1,
      msg: `${req.method}: ${req.originalUrl} --> Unauthorized`,
    })
  }

  next()
}
