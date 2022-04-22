import axios from 'axios'
import authHeader from "./auth-header";

const TRANSACTION_API_POST_URL = "/api/transaction";
const TRANSACTION_API_GET_ALL_URL ="/api/transaction/personid/"

class TransactionService 
{
    postTransaction(transaction)
    {
        return axios.post(TRANSACTION_API_POST_URL , transaction, { headers: authHeader() });
    }
    getAllTransaction(id)
    {
        return axios.get(TRANSACTION_API_GET_ALL_URL + id, { headers: authHeader() });
    }
}

export default new TransactionService()