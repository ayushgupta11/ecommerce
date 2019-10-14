import passwordHash from 'password-hash'
import generateAdminToken from '../../helpers/generateAdminToken'
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
                        generateAdminToken(userData).then((token) => {
                            userData['token'] = token
                            success(response, userData)
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