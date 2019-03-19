import React from "react";
import QueryItem from "./queryitem";
import { getAllQueries } from "./database";

export default class QueryList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let queries;

		if(this.props.items.length > 0){
			let arrSorted = [...this.props.items];
			arrSorted.sort( (a,b) => b[1].timestamp - a[1].timestamp);

			queries = arrSorted.map( (item, index) => {
				return(
				<QueryItem 
					key={item[0]}
					query={item[1].query}
					timestamp={item[1].timestamp}
					keyId={item[0]}
					deleteQuery={this.props.deleteQuery}
				/>)
			} )
		}

		return(
				<div>
					{queries}
				</div>
			)

	}
}