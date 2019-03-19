import React from "react";
import { getAllQueries, removeQuery } from "./database";

class QueryItem extends React.Component{
	constructor(props){
		super(props);
	}

	formatateTime(){
		let timestamp = new Date(this.props.timestamp);
		let monthNumber = timestamp.getMonth();
		if(monthNumber < 10){
			monthNumber = "0" + monthNumber;
		}
		let minutes = timestamp.getMinutes();
		if(minutes < 10){
			minutes = "0" + minutes;
		}
		let timestampFormated = `${timestamp.getDate()}/${monthNumber}/${timestamp.getFullYear()} ${timestamp.getHours()}:${minutes}`;
		return timestampFormated;
	}

	render(){

		return(
				<div className="d-flex border-bottom border-dark align-items-center">
					<div className="p-2 flex-fill bd-highlight">
						<span><i>{this.formatateTime()}</i></span>
						<h4 className="list-group-item-heading">{this.props.query}</h4>
					</div>
					<div className="p-2 flex-fill bd-highlight text-right">
						<button 
							className="btn btn-dark btn-sm"
							onClick={() => this.props.deleteQuery(this.props.keyId)}
						>
						DELETE
						</button>
					</div>
				</div>
			)
	}
}

export default QueryItem;
