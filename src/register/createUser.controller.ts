import { Request, Response } from 'express'
import { createUserService } from './createUser.service'


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await createUserService(req.body)

    return res.status(201).json(newUser)
}

export { createUserController }