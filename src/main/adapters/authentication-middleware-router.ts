import { Injectable, type NestMiddleware } from '@nestjs/common'
import { type Request, type Response, type NextFunction } from 'express'
import { AuthenticationMiddleware } from '../../application/middlewares'

@Injectable()
export class AuthenticationMiddlewareRouter implements NestMiddleware {
  constructor (private readonly authentication: AuthenticationMiddleware) {}

  async use (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { statusCode, data } = await this.authentication.handle({ authorization: req.headers.authorization })
    if (statusCode === 200) {
      const validEntries = Object.entries(data).filter(([, value]) => value)
      req.user = { ...req.user, ...Object.fromEntries(validEntries) }
      next()
    } else {
      res.status(statusCode).json({ error: data.message })
    }
  }
}
