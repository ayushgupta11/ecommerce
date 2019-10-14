import passwordHash from 'password-hash'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import generateToken from '../../helpers/generateToken'

export default (db) => {
    return (request, response) => {
        const { data } = request.body
        console.log(request.body)
        if(data){
            console.log(data)
            const email = data.email
            const password = passwordHash.generate(data.password.trim())
            const name = data.name
            let query = {
                email,
                name,
                password
            }
            console.log(query)
            if(email.trim().length && password.trim().length && name.trim().length){
                db.users.findOne({
                    email
                }, (err, doc) => {
                    if(err){
                        console.log(err)
                        internalServerError(response, err)
                    }
                    else{
                        console.log(doc)
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
                                        userData['token'] = token
                                        success(response, userData)
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
        else{
            badRequest(response)
        }
    }
}

