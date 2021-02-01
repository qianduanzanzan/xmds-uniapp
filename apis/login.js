import request from "../utils/request.js"

export const login = (data) => 
	request({
		url:"/cus/login",
		data,
		method:"POST",
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		}
	})