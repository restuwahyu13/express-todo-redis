exports.toJson = (data) => {
	return JSON.stringify({ data: data })
}

exports.toObject = (data) => {
	return JSON.parse(data).data
}
