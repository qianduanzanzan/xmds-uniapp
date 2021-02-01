import request from "../utils/request.js"

export const getSkuByAttrs = (data) => 
	request({
		url:"/cus/prodSku/getSkuByAttrs",
		method:"POST",
		data
	})