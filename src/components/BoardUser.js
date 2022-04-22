import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import transactionService from '../services/transaction-service';
const currentUser = AuthService.getCurrentUser();

export default class BoardUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactionList: [],
      currentUser: ''
    }
  }
  componentDidMount() {
    transactionService.getAllTransaction(currentUser.id).then(res => {
      this.setState({ transactionList: res.data })
    })
  }
  render() {
    return (
      <div className="container">
        <div >
          <div className="testbenches-header-container" style={{ 'marginTop': '30px' }}>
            <div className="testbenches-header-content1">
              <div>
                <span className='testbenches-heading mx-2'>Books Issued</span>
              </div>

            </div>
          </div>
          <div className="testbenches-table-container">
            <div className="testbenches-table-content2">
              <table>
                <tr>
                  <th>S.No.</th>
                  <th>issue_date</th>
                  <th>expiry_date</th>
                  <th>book_title</th>
                  <th></th>
                </tr>
                {this.state.transactionList.map((e, i) =>
                        <tr>
                            <td>{i+1}</td>
                            <td>{e.issueDate}</td>
                            <td>{e.expiryDate}</td>
                            <td>{e.book.title}</td>
                        </tr>
                    )}
                    {console.log(this.state.transactionList)}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}