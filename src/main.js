import React from "react";
import { FormBuilder, FieldControl, FieldGroup, Validators } from "react-reactive-form";
import { render } from "react-dom";
import QueryList  from "./querylist";
import QueryInput from "./queryinput";
import { getAllQueries, removeQuery } from "./database";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Main extends React.Component {
	constructor(){
		super();
		this.state = {
			arr: [],
		};
		this.myForm = FormBuilder.group({
			search_text: ["", Validators.required],
		});
		this.deleteQuery = this.deleteQuery.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	componentDidMount(){
		getAllQueries()
		.then( snapshot => {
			if( snapshot.val() ){
				let allQueriesArray = Object.entries(snapshot.val());
				this.setState({arr: allQueriesArray});
			} else {
				this.setState({arr: []});
			}
		})
	}

	deleteQuery(id){
		removeQuery(id).then(() => {
			this.setState({arr: this.state.arr.filter((x) => x[0] !== id)})
		});
	}

	updateState(state){
		let arr = [...this.state.arr, state];
		this.setState({arr});
	}

	render(){

		return (
			<div className="container w-50">
					<FieldGroup
					control={this.myForm}
						render={({ value }) => (
				            <form onSubmit={() => this.handleSubmit}>
				            <QueryInput 
				            	myForm={this.myForm}
				            	updateState={this.updateState}
				            />
				            </form>
				        )}
					/>
				<h3 className="py-4">Search history - {this.state.arr.length} request(s)</h3>
				<QueryList 
					deleteQuery={this.deleteQuery}
					items={this.state.arr}
				/>
			</div>
			)
	}
}
