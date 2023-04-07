import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateJWT = (payload: {[key: string]: number | string | boolean | Types.ObjectId}) => {
    return jwt.sign(payload, process.env.SECRET_KEY || '', {expiresIn: '24h'})
}

