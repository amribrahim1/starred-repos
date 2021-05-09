import { Component } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';

class Repositories extends Component {
  	state = {
		repositories: [],
        error: "",
        alertError: false
	}
	
	componentDidMount() {
        fetch(`https://api.github.com/search/repositories?q=created:>2021-04-04&sort=stars&order=desc&page=${this.props.match.params.page}`)
		.then(response => response.json())
		.then(data => this.setState({repositories: data.items}))
		.catch(err => {
        	console.log(err);
            this.setState({
                error: err.message,
                alertError: true
            })
    	});
  	}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.setState({repositories: []})
            fetch(`https://api.github.com/search/repositories?q=created:>2021-04-04&sort=stars&order=desc&page=${this.props.match.params.page}`)
            .then(response => response.json())
            .then(data => this.setState({repositories: data.items}))
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err.message,
                    alertError: true
                })
            });
        }
    }

  	render() {
		// console.log(this.state);
        if (this.props.match.params.page < 1 || this.props.match.params.page > 34) {
            return <Redirect to="/"/>
        }
        if (this.state.repositories.length === 0) {
            if (this.state.alertError) {
                return (
                    <div style={{height: "60vh", marginTop: "30vh"}}>
                        <div className={this.state.alertError ? "alert alert-danger" : "d-none" } role="alert">
                            {this.state.error}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div style={{height: "60vh", marginTop: "30vh"}}>
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                )
            }
            
		} else {
            return (
                <div>
                    <h3 className="mb-2">
                        The most starred Github repositories created in the last 30 days<br/>
                        <small>Page {this.props.match.params.page}</small>
                    </h3>
                    
                    {this.state.repositories.map(repo => 
                        <div className="card mb-2" style={{maxWidth: "850px"}} key={repo.id}>
                            <div className="row g-0">
                                <div className="col-md-4 m-auto text-center">
                                    <img src={repo.owner.avatar_url} alt="avatar" height="200px" width="auto" />
                                </div>
                                <div className="col-md-8 text-left">
                                    <div className="card-body">
                                        <a href={repo.svn_url} target="_blank" rel="noreferrer"><h5 className="card-title">{repo.name}</h5></a>
                                        <p className="card-text">{repo.description}</p>
                                        <p className="card-text start d-inline-block m-2">
                                            <span style={{padding:"10px", border: "1px solid gray"}}>
                                                <span>{repo.stargazers_count}</span>&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-star" viewBox="0 0 16 16" style={{marginBottom:"4px", color: "#f1e05a"}} fill="#f1e05a">&nbsp;
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                            </span>
                                        </p>
                                        <p className="card-text start d-inline-block m-2">
                                            <span style={{padding:"10px", border: "1px solid gray"}}>
                                                <span>Issues: {repo.open_issues_count}</span>
                                            </span>
                                        </p>
                                        <p className="d-inline-block">Submitted {Math.floor((new Date() - new Date(repo.created_at))/(60 * 60 * 24 * 1000))} days ago by <span style={{fontWeight: "bold"}}>{repo.owner.login}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
  	}
}

export default Repositories;
