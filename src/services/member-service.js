import axios from 'axios'
import authHeader from "./auth-header";

const MEMBER_API_GET_URL ="/api/getUser/"

class MemberService 
{
   
    getMember(id)
    {
        return axios.get(MEMBER_API_GET_URL + id, { headers: authHeader() });
    }
}

export default new MemberService()