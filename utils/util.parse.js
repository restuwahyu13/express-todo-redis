exports.toJson = (data) => {
	return JSON.stringify({ data: data })
}

exports.toObject = (data) => {
	console.log(data)
	return JSON.parse(data).data
}
