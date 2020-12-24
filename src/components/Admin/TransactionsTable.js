import React, { Component } from 'react';

import TablePagination from '../TablePagination';
import AddTransactionModal from './AddTransactionModal.js';
import ViewTransactionModal from './ViewTransactionModal.js';

class TransactionsTable extends Component {
    state = {
        recordsPerPage: 10,
        recordStartIndex: 0,
        activePage: 1
    }

    renderItems = (transactions) => {
        const { recordsPerPage, recordStartIndex } = this.state;
        let items = [];
        const recordStopIndex = transactions.length <= recordStartIndex + recordsPerPage ?
        transactions.length : recordStartIndex + recordsPerPage

        for(var i = this.state.recordStartIndex; i < recordStopIndex; i++){
            items.push(
                <tr key={transactions[i].id} className="table-row">
                    <td>{this.formatDate(transactions[i].transDate)}</td>
                    <td className="d-none d-lg-table-cell">{transactions[i].lastName + ", " + transactions[i].firstName + " " + transactions[i].middleName}</td>
                    <td>{transactions[i].petName}</td>
                    <td className="d-none d-lg-table-cell">{transactions[i].petWeight}</td>
                    <td className="d-none d-md-table-cell">
                        {transactions[i].empLastName + ", " + transactions[i].empFirstName + " " + transactions[i].empMiddleName}
                    </td>
                    <td>
                        <button className="btn btn-outline-primary btn-sm mr-1"
                        data-toggle="modal" data-target={"#viewTransactionModal-" + transactions[i].id}>
                            <i className="fa fa-eye"></i>
                            <span className="ml-1">View</span>
                        </button>
                    </td>
                </tr>
            )
        }

        return([ items ]);
    }

    setPage = (recordStartIndex, activePage) => {
        this.setState({ recordStartIndex, activePage });
    }

    render() {
        const { transactions, onRefresh, onSearch, searchValue, onClear, history } = this.props;
        const { recordsPerPage, recordStartIndex, activePage } = this.state;
        return (
            <React.Fragment>
                <div className="d-flex mb-2">
                    <button className="btn btn-outline-primary mr-auto"
                    data-toggle="modal" data-target="#addTransactionModal">
                        <i className="fa fa-plus"></i>
                        <span className="ml-1 d-sm-inline d-none">New</span>
                    </button>
                    <button className="btn btn-warning mr-2" onClick={onRefresh}>
                        <i className="fa fa-sync"></i>
                        <span className="ml-1 d-sm-inline d-none">Refresh</span>
                    </button>
                    <input type="text" className="form-control w-25 min-w-175px"
                    placeholder="Search" onChange={onSearch} value={searchValue} ></input>
                    <button className="btn btn-danger ml-2" onClick={onClear}>
                        <i className="fa fa-eraser"></i>
                        <span className="ml-1 d-sm-inline d-none">Clear</span>
                    </button>
                </div>
                
                <table className="table table-bordered">
                    <thead className="thead-dark text-light">
                        <tr>
                            <th>Transaction Date</th>
                            <th className="d-none d-lg-table-cell">Customer Name</th>
                            <th>Pet Name</th>
                            <th className="w-110px d-none d-lg-table-cell">Pet Weight</th>
                            <th className="w-285px d-none d-md-table-cell">Served by</th>
                            <th className="w-100px">Action</th>
                        </tr>
                    </thead>
                    <tbody>{ transactions.length > 0 ? this.renderItems(transactions) : null }</tbody>
                </table>
                {
                    transactions.length > 0 ?
                    <TablePagination
                    setPage={this.setPage}
                    recordsPerPage={recordsPerPage}
                    recordStartIndex={recordStartIndex}
                    activePage={activePage}
                    totalRecords={transactions.length} /> : null
                }
                <AddTransactionModal onRefresh={onRefresh} customerId='' />
                {
                    transactions.map(transaction => <ViewTransactionModal key={transaction.id}
                    transaction={transaction} onRefresh={onRefresh} history={history} /> )
                }
            </React.Fragment>
        );
    }

    formatDate = dateValue => {
        const MMM = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        dateValue = new Date(dateValue);
        const day = dateValue.getDate();
        const month = MMM[dateValue.getMonth()];
        const year = dateValue.getFullYear();

        return year + "-" + month + "-" + day;
    }

    formatTransType = transType => {
        return transType === 'C' ? "Check-up" : "Groom"
    }
}
 
export default TransactionsTable;