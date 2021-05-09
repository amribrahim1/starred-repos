import { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Repositories from './Repositories'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class App extends Component {
  	state = {

	}

	handlePageClick = (data) => {
		console.log(data);
		this.props.history.push(`/repositories/${data.selected+1}`);
	};
	
  	render() {
		// console.log(this.props)
		return (
			<div className="container text-center mt-4">
				<Switch>
					<Route path="/repositories/:page" component={Repositories}/>
					<Redirect from="/" exact to="/repositories/1"/>
					<Redirect to="/"/>
				</Switch>
				<ReactPaginate
					pageCount={34}
					forcePage={Number(this.props.location.pathname.replace(/[\D]/g, '')-1)}
					previousLabel={<button className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></button>}
					nextLabel={<button className="page-link" href="" aria-label="Next"><span aria-hidden="true">&raquo;</span></button>}
					pageClassName="page-item"
					pageLinkClassName="page-link"
					breakLabel={'......'}
					breakClassName={'break-me'}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.handlePageClick}
					containerClassName={'pagination justify-content-center'}
					activeClassName={'active'}
				/>
			</div>
		)
  	}
}

export default withRouter(App);
