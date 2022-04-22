import axios from 'axios'
import authHeader from "./auth-header";

const BOOKS_API_POST_URL = "/api/addBook";
const BOOKS_API_GET_ALL_URL ="/api/getAllBooks"

class TestbenchService 
{
    postBook(book)
    {
        return axios.post(BOOKS_API_POST_URL,book, { headers: authHeader() });
    }
    getAllBooks()
    {
        return axios.get(BOOKS_API_GET_ALL_URL, { headers: authHeader() });
    }
}

export default new TestbenchService()