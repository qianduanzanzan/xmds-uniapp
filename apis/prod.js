import request from "../utils/request.js"

export const getProdByCate = (data) => 
	request({
		url:"/cus/prod/getProdByCate",
		method:"POST",
		data
	})
	
export const getProdDetailById = (data) => 
	request({
		url:"/cus/prod/getProdDetail",
		method:"POST",
		data
	})