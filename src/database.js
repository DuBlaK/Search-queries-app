var firebase = require('firebase/app');
require('firebase/database');

const config = {
	apiKey: "AIzaSyCBZZk85PbMGGpQZox8s4nAJn4zqx9d0lc",
	authDomain: "store-search-history.firebaseapp.com",
	databaseURL: "https://store-search-history.firebaseio.com",
	projectId: "store-search-history",
	storageBucket: "store-search-history.appspot.com",
	messagingSenderId: "584416060603",
};

firebase.initializeApp(config);
let database = firebase.database();


export function getAllQueries() {
	return database.ref().once('value');
}

export function removeQuery(id) {
	return database.ref(`/${id}`).remove();
}

export function addQuery(query) {
	let data = {
		query,
		timestamp: new Date().getTime()//firebase.database.ServerValue.TIMESTAMP,
	};
	return database.ref().push(data).then((res) => {
		return [res.getKey(), data]
	});
}