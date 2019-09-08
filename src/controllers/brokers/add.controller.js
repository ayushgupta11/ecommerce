import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { name, email, mobile, status, brokerCode } = data
            let query = {
                name,
                email,
                mobile,
                status,
                brokerCode,
                timestamp: Date.now()
            }
            db.brokers.insert(query, (err, doc) => {
                if(err){
                    internalServerError(response, doc)
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