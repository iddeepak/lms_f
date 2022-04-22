import React, { Component } from 'react'
import booksService from '../services/books-service'
import AuthService from '../services/auth.service'
import memberService from '../services/member-service'

import './home.css';
import transactionService from '../services/transaction-service';
const currentUser = AuthService.getCurrentUser();
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            booksList: [],
            currentUser: ''
        }
    }
    getCurrentDate(separator = '/') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    getExpiryDate(separator = '/') {
        var temp = new Date();
        var newDate = new Date(temp.setTime( temp.getTime() + 7 * 86400000 ));
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
   
    savePurchase = (e) => {
        

        let transaction = { issue_date: this.getCurrentDate() , expiry_date: this.getExpiryDate()  , book: e , person:this.state.currentUser };
        transactionService.postTransaction(transaction).then( res => {
                
        });
        console.log('transaction =>' + JSON.stringify(transaction));

    }
    componentDidMount() {
        booksService.getAllBooks().then(res => {
            this.setState({ booksList: res.data })
        });
        memberService.getMember(currentUser.id).then(res => {
            this.setState({currentUser:res.data})
        })
    }
    render() {
        return (
            <div className="container">
                    <div >
                        <div className="testbenches-header-container" style={{ 'marginTop': '30px' }}>
                            <div className="testbenches-header-content1">
                                <div>
                                    <span className='testbenches-heading mx-2'>Books</span>
                                </div>

                            </div>
                        </div>
                        <div className="testbenches-table-container">
                            <div className="testbenches-table-content2">
                                <table>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>title</th>
                                        <th>isbn</th>
                                        <th>year</th>
                                        <th>available_books</th>
                                        <th></th>
                                    </tr>
                                    {this.state.booksList.map((e, i) =>
                                        <tr>
                                            <td>1</td>
                                            <td>{e.title}</td>
                                            <td>{e.isbn}</td>
                                            <td>{e.year}</td>
                                            <td>{e.available_books}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button className="btn btn-dark" onClick={() => this.savePurchase(e)}>Purchase</button>
                                                    <div class="dropdown-content" style={{ 'min-width': '57px' }}>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        );
    };
}
