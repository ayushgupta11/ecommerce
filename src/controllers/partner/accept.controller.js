import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let { _id, status } = data
            db.partner.update(
                { '_id' : mongojs.ObjectId(_id) },
                {
                    $set:{
                        accepted: status
                    }
                },
                {
                    upsert: true
                },
                (err, doc) => {
                    if(err){
                        internalServerError(response, err)
                    }
                    else{
                        success(response, doc)
                    }
                }
            )
        }
        else{
            badRequest(response)
        }
    }
}