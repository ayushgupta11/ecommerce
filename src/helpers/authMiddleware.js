import jwt from 'jsonwebtoken'
import { unAuthorized, internalServerError, success } from './responseTemplate'
import accessTokenConfig from '../config/accessTokenConfig'
import refreshTokenConfig from '../config/refreshTokenConfig'

export default () => {
    return (request, response, next) => {
        if(request.headers.authorization && request.headers.refreshTokenConfig){
            let accessToken = req.headers['authorization'].split(' ')[1]
            let refreshToken =  req.headers['refreshTokenConfig'].split(' ')[1]
            jwt.verify(accessToken, accessTokenConfig.secret, (err, decoded) => {
                if(err || decoded == undefined){
                    jwt.verify(refreshToken, refreshTokenConfig.secret, (err, decoded) => {
                        if(err || decoded == undefined){
                            unAuthorized(response)
                        }
                        else{
                            jwt.sign(decoded, accessTokenConfig.secret, { expiresIn: accessTokenConfig['expiresIn'] }, (err, token) => {
                                if(err){
                                    internalServerError(response, err)
                                }
                                else{
                                    success(response, token)
                                }
                            })
                        }
                    })
                }
                else{
                    request.body['data']['user'] = decoded
                    next()
                }
            })
        }
        else{
            unAuthorized(response)
        }
    }
}