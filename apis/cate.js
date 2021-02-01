import request from "../utils/request.js"

export const getAllCate = () => 
	request({
		url:"/cus/prodCategory/getAllCategory",
		method:"POST"
	})