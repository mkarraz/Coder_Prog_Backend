import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {

    if (
        !req.originalUrl.includes('/api/cart') ||
        !req.originalUrl.includes('/api/products')
    ) {
        return res.status(401).json({
            error: -2,
            msg: `${req.method}: ${req.originalUrl} --> Not implemented`,
        })
    }

    next()
}