import request from "../utils/request.js"

export const addShopCart = (data) => 
	request({
		url:"/cus/shopCart/add",
		method:"POST",
		data
	})