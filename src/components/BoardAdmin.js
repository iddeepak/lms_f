import React, { Component } from 'react'
import booksService from '../services/books-service'
import AuthService from '../services/auth.service'
import memberService from '../services/member-service'

const currentUser = AuthService.getCurrentUser();
export default class BoardAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            booksList: [],
            currentUser: '',
            title: '',
            year: '',
            isbn: '',
            available_books: '',
            publisherName: '',
            authors: []
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
        this.changeAvailabeBooksHandler = this.changeAvailabeBooksHandler.bind(this);
        this.changePublisherNameHandler = this.changePublisherNameHandler.bind(this);
        this.changeAuthorsHandler = this.changeAuthorsHandler.bind(this);
    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }
    changeYearHandler = (event) => {
        this.setState({ year: event.target.value });
    }
    changeIsbnHandler = (event) => {
        this.setState({ isbn: event.target.value });
    }
    changeAvailabeBooksHandler = (event) => {
        this.setState({ available_books: event.target.value });
    }
    changePublisherNameHandler = (event) => {
        this.setState({ publisherName: event.target.value });
    }
    changeAuthorsHandler = (event) => {
        this.setState({ authors: event.target.value });
    }
    saveBook = (e) => {
        e.preventDefault();
        let book = {
            title: this.state.title, year: this.state.year, isbn: this.state.isbn, available_books: this.state.available_books, publisher: { name: this.state.publisherName },
            authors: this.state.authors
        };
        console.log('book =>' + JSON.stringify(book));

        booksService.postBook(book).then(res => {

        });

    }
    deleteBook = (e) => {
        console.log(e);
        booksService.deleteBook(e.id).then(res => {

        });

    }
    updateBook = (e) => {
        console.log(e);
        let book = { id:e,
            title: this.state.title, year: this.state.year, isbn: this.state.isbn, available_books: this.state.available_books, publisher: { name: this.state.publisherName },
            authors: this.state.authors
        };
        console.log('book =>' + JSON.stringify(book));


        booksService.updateBook(book).then(res => {

        });

    }
    componentDidMount() {
        booksService.getAllBooks().then(res => {
            this.setState({ booksList: res.data })
        }).catch(() => {
            window.location.href = "/logout";
        });
        memberService.getMember(currentUser.id).then(res => {
            this.setState({ currentUser: res.data })
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
                                        <td>{e.id}</td>
                                        <td><input placeholder='titile' defaultValue={e.title} onChange={ (e) => this.changeTitleHandler(e)} style={{'width':'6em'}}/></td>
                                        <td><input placeholder='isbn' defaultValue={e.isbn} onChange={ (e) => this.changeIsbnHandler(e)} style={{'width':'6em'}}/></td>
                                        <td><input placeholder='year' defaultValue={e.year} onChange={ (e) => this.changeYearHandler(e)} style={{'width':'6em'}}/></td>
                                        <td><input placeholder='available_books' defaultValue={e.available_books} onChange={ (e) => this.changeAvailabeBooksHandler(e)} style={{'width':'6em'}}/></td>
                                        <td>
                                            <div class="dropdown">
                                                <button className="btn btn-dark mx-3" onClick={() => this.deleteBook(e)}>delete</button>
                                                <button className="btn btn-dark" onClick={() => this.updateBook(e.id)}>update</button>
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
                <div>
                    <div className="testbenches-header-container">
                        <div className="testbenches-header-content1">
                            <div>
                                <span className='testbenches-heading mx-3'>Create Book</span>
                            </div>
                        </div>
                    </div>
                    <div className="testbenches-table-container">
                        <div className="testbenches-label my-2">
                            <div className="testbenches-label mx-3" >Title</div>
                            <div>
                                <input placeholder='Name' value={this.state.title} onChange={this.changeTitleHandler} />
                            </div>
                        </div>
                        <div className="testbenches-label my-2">
                            <div className="testbenches-label mx-3">Year</div>
                            <div>
                                <input placeholder='year' value={this.state.year} onChange={this.changeYearHandler} />
                            </div>
                        </div>
                        <div className="testbenches-label my-2">
                            <div className="testbenches-label mx-3">isbn</div>
                            <div>
                                <input placeholder='isbn' value={this.state.isbn} onChange={this.changeIsbnHandler} />
                            </div>
                        </div>
                        <div className="testbenches-label my-2">
                            <div className="testbenches-label mx-3">available_books</div>
                            <div>
                                <input placeholder='availabe_books' value={this.state.available_books} onChange={this.changeAvailabeBooksHandler} />
                            </div>
                        </div>
                        <div className="testbenches-label my-2">
                            <div className="testbenches-label mx-3">publisher</div>
                            <div>
                                <input placeholder='publisher' value={this.state.publisherName} onChange={this.changePublisherNameHandler} />
                            </div>
                        </div>
                        <div className="testbenches-create-save my-3">
                            <span className='btn btn-dark mx-3' onClick={this.saveBook}>Save Book</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
