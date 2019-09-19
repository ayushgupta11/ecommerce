import { success, badRequest } from '../../helpers/responseTemplate'

export default (request, response) => {
    let {data} = request.body
    if(data){
        let {user} = data
        success(response, user)
    }
    else{
        badRequest(response)
    }
}