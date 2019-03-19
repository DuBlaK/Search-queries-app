import React from "react";
import { FieldControl, Validators } from "react-reactive-form";
import { addQuery, getAllQueries } from "./database";


export default class QueryInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
	    e.preventDefault();
	    addQuery(this.props.myForm.value.search_text).then((res) => this.props.updateState(res));
		this.props.myForm.reset();
	}

	render(){
		const TextInput = ({
		  handler,
		  invalid,
		  meta: { label, placeholder },
		}) => (
		  <div className="d-flex my-3 justify-content-around align-items-center">
		    <label className="col-xs-2">{label}:</label>
		    <div className="col-xs-10 flex-grow-1 mx-3">
		    	<input 
		    		className="form-control" 
		    		placeholder={placeholder} 
		    		{...handler()}
		    	/>
		    </div>
		    <div className="col-xs-10">
			    <button
	              className="btn btn-primary"
	              onClick={e => this.handleSubmit(e)}
	              disabled={invalid}
	            >
	              Find
		        </button>
	        </div>
		  </div>
		);

		return(
			<FieldControl
				formState={{value: "", disabled: false}}
	          	options={{ 
	          		validators: [Validators.required, Validators.maxLength(100)]
	          	}}
	            name="search_text"
	            render={TextInput}
	            meta={{
	              label: "I'm looking for",
	              placeholder: "Text of my search request",
	            }}
	         />
			)
	}
}