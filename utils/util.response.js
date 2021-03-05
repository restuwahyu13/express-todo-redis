const { Publisher } = require('./util.publisher')
const { Subscriber } = require('./util.subscriber')

exports.getListenerSubscriber = () => {
	const getResponseSubscriber = new Subscriber({ key: 'Response' })
	return new Promise((resolve, reject) => {
		getResponseSubscriber
			.getResponse()
			.then((response) => resolve(response))
			.catch((error) => reject(error))
	})
}

exports.setSpeakerPublisher = async (response) => {
	const setResponsePublisher = new Publisher({ key: 'Response' })
	if (response) {
		await setResponsePublisher.setResponse({ ...response })
	} else {
		await setResponsePublisher.setResponse({})
	}
}
