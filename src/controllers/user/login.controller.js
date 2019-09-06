import passwordHash from 'password-hash'
import generateToken from '../../helpers/generateToken'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        const { data } = request.body
        if(data){
            let email = data.email
            let password = data.password
            let query ={
                email
            }
            db.users.findOne(query, (err, doc) => {
                if(err){
                    internalServerError(response, err)
                }
                else if(doc){
                    if(!passwordHash.verify(password, doc.password)){
                        response.status(401).send({
                            data: {},
                            message: "Unauthorized",
                            error: true
                        })
                    }
                    else{
                        let userData = {...doc}
                        delete userData['password']
                        generateToken(userData).then((token) => {
                            success(response, token)
                        }).catch((err) => {
                            internalServerError(response, err)
                        })
                    }
                }
                else{
                    response.status(401).send({
                        data: {},
                        message: "Unauthorized",
                        error: true
                    })
                }
            })
        }
    }
}

