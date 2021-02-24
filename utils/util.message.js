const { Publisher } = require('./util.publisher')
const { Subscriber } = require('./util.subscriber')

const setResponsePublisher = new Publisher({ key: 'Message' })
const getResponseSubscriber = new Subscriber({ key: 'Message' })

exports.getResponseSubscriber = () => {
	return new Promise((resolve, reject) => {
		getResponseSubscriber
			.getResponse()
			.then((response) => resolve(response))
			.catch((error) => reject(error))
	})
}

exports.setResponsePublisher = async (message) => {
	if (message) {
		await setResponsePublisher.setResponse({ ...message })
	} else {
		await setResponsePublisher.setResponse({})
	}
}
