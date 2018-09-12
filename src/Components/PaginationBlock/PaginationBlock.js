import React, { Component } from "react";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import GetUsersActions from '../../actions/GetUsersActions';

/**
 * Pagination
 */

class PaginationBlock extends Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
        this.pageCount = 10;
        this.activePage = 0;
    }

    handlePageChange(pageNumber) {
        const {activePage,pageCount} = this;
        const offset = `offset=${Math.abs((pageNumber-activePage-1)*pageCount)}`;
        GetUsersActions.getUsers(offset)
    }

    render() {
        const {count, offset} = this.props.pagination;
        let {pageCount,activePage} = this;
        activePage = offset/pageCount+1;

        return (
            <div>
                <Pagination
                    hideFirstLastPages
                    activePage={activePage}
                    itemsCountPerPage={pageCount}
                    totalItemsCount={count}
                    pageRangeDisplayed={pageCount}

                    activeClass="active"
                    itemClassPrev="previous"
                    itemClassNext="next"
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        pagination: state.users.pagination,
    }}

export default connect(mapStateToProps)(PaginationBlock);