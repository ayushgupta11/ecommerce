import jwt from 'jsonwebtoken'
import db from '../helpers/getConnection'
import accessTokenConfig from '../config/accessTokenConfig'
import refreshTokenConfig from '../config/refreshTokenConfig'


export default (data) => {
    return new Promise((resolve, reject) => {
        console.log("Generate Token")
        jwt.sign(data,
            accessTokenConfig.secret,
            { expiresIn: accessTokenConfig['expiresIn'] }
            , (err, accessToken) => {
                if(err){
                    reject(err)
                }
                else{
                    jwt.sign(data,
                        refreshTokenConfig.secret,
                        { expiresIn: refreshTokenConfig['expiresIn'] }, (err, refreshToken) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                let query = {
                                    refreshToken
                                }
                                db.refresh_token.insert(query, (err, doc) => {
                                    if(err){
                                        reject(err)
                                    }
                                    if(doc){
                                        let token = {
                                            accessToken,
                                            refreshToken
                                        }
                                        resolve(token)
                                    }
                                })
                            }
                        })
                }
            })
    })
}