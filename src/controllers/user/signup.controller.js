import passwordHash from 'password-hash'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import generateToken from '../../helpers/generateToken'

export default (db) => {
    return (request, response) => {
        const { data } = request.body
        if(data){
            const email = data.email
            const password = passwordHash.generate(data.password.trim())
            const name = data.name
            let query = {
                email,
                name,
                password
            }
            if(email.trim().length && password.trim().length && name.trim().length){
                db.users.findOne({
                    email
                }, (err, doc) => {
                    if(err){
                        internalServerError(response, err)
                    }
                    else{
                        if(doc){
                            response.status(401).send({
                                error: true,
                                message: "User already exists",
                                data: {}
                            })
                        }
                        else{
                            db.users.insert(query, (err, doc) => {
                                if(err){
                                    internalServerError(response, err)
                                }
                                if(doc){
                                    let userData = {...doc}
                                    delete userData['password']
                                    generateToken(userData).then((token) => {
                                        success(response, token)
                                    }).catch((err) => {
                                        internalServerError(response, err)
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
}

