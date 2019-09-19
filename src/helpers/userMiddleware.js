import jwt from 'jsonwebtoken'
import { unAuthorized, internalServerError } from './responseTemplate'
import accessTokenConfig from '../config/accessTokenConfig'
import refreshTokenConfig from '../config/refreshTokenConfig'
import generateToken from './generateToken'

export default (request, response, next) => {
    if (request.headers.authorization && request.headers.refreshtokenconfig) {
        let accessToken = request.headers['authorization']
        let refreshToken = request.headers['refreshtokenconfig']
        jwt.verify(accessToken, accessTokenConfig.secret, (err, decoded) => {
            if (err || decoded == undefined) {
                jwt.verify(refreshToken, refreshTokenConfig.secret, (err, decoded) => {
                    if (err || decoded == undefined) {
                        unAuthorized(response)
                    }
                    else {
                        generateToken(decoded).then((token) => {
                            unAuthorized(response, token)
                        }).catch((error) => {
                            internalServerError(response, error)
                        })
                    }
                })
            }
            else {
                request.body['data'] = {}
                request.body['data']['user'] = decoded
                next()
            }
        })
    }
    else {
        unAuthorized(response)
    }
}