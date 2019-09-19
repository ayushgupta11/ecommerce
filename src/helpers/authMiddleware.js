import jwt from 'jsonwebtoken'
import { unAuthorized, internalServerError, success } from './responseTemplate'
import accessTokenConfig from '../config/accessTokenConfig'
import refreshTokenConfig from '../config/refreshTokenConfig'
import generateToken from './generateToken'
import mongojs from 'mongojs'

export default (request, response, next) => {
    if (request.headers.authorization && request.headers.refreshtokenconfig) {
        let accessToken = request.headers['authorization'].split(' ')[1]
        let refreshToken = request.headers['refreshtokenconfig'].split(' ')[1]
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
                request.body['data']['user'] = decoded
                next()
            }
        })
    }
    else {
        if (request.body.data) {
            if (request.body.data.hasOwnProperty('user')) {
                next()
            }
            else {
                request.body.data['user'] = {
                    '_id': mongojs.ObjectId()
                }
                next()
            }
        }
        else next()
    }
}