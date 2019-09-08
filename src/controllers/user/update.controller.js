import mongojs from 'mongojs'
import { success, badRequest, internalServerError } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let { mobile, address, user } = data
            db.users.findAndModify({
                query: { "_id": mongojs.ObjectID(data.user["_id"]) },
                update: { 
                    "mobile": mobile,
                    $push: { "address": address }
                }
            }, (err, doc) => {
                if(err){
                    internalServerError(response, err)
                }
                else{
                    success(response)
                }
            })
        }
        else{
            badRequest(response)
        }
    }
}