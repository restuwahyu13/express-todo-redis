const { Publisher } = require('./util.publisher')
const { Subscriber } = require('./util.subscriber')

exports.getResponseSubscriber = () => {
	const getResponseSubscriber = new Subscriber({ key: 'Message' })
	return new Promise((resolve, reject) => {
		getResponseSubscriber
			.getResponse()
			.then((response) => resolve(response))
			.catch((error) => reject(error))
	})
}

exports.setResponsePublisher = async (message) => {
	const setResponsePublisher = new Publisher({ key: 'Message' })
	if (message) {
		await setResponsePublisher.setResponse({ ...message })
	} else {
		await setResponsePublisher.setResponse({})
	}
}
