import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let {name, mobile, pincode, address, town, city, state, user} = data
            let query = {
                name,
                mobile,
                pincode,
                address,
                town,
                city,
                state,
                customer_id: mongojs.ObjectId(user._id)
            }
            db.delivery.insert(query, (err, doc) => {
                if(err){
                    internalServerError(response, err)
                }
                else{
                    success(response, doc)
                }
            })
        }
        else{
            badRequest(response)
        }
    }
}