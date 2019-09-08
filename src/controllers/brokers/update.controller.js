import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { status, email } = data
            let query = {
                status,
                timestamp: Date.now()
            }
            db.brokers.findAndModify({
                "query": { email },
                "update": query
            }, (err, doc) => {
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