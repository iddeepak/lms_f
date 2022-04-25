import axios from 'axios'
import authHeader from "./auth-header";

const BOOKS_API_POST_URL = "/api/addBook";
const BOOKS_API_GET_ALL_URL ="/api/getAllBooks";
const BOOKS_API_DELETE_URL = "/api/deleteBook/";
const BOOKS_API_UPDATE_URL = "/api/updateBook";

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
    deleteBook(id)
    {
        return axios.delete(BOOKS_API_DELETE_URL + id, { headers: authHeader() });
    }
    updateBook(book)
    {
        return axios.put(BOOKS_API_UPDATE_URL , book , { headers: authHeader() });
    }
}

export default new TestbenchService()