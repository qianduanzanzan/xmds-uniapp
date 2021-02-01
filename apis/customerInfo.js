import request from "../utils/request.js"

export const getCustomerInfoByToken = () => 
	request({
		url:"/cus/getCusInfoByToken",
		method:"POST"
	})