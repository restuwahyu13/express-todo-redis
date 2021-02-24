const { Publisher } = require('./utils/util.publisher')

exports.setCreatePublisher = async (data) => {
	const createPublisher = new Publisher({ key: 'Create' })
	if (data) {
		await createPublisher.setMap('create:speaker', { ...data })
	} else {
		await createPublisher.setMap('create:speaker', {})
	}
}

exports.setResultPublisher = async (data) => {
	const resultPublisher = new Publisher({ key: 'Result' })
	if (data) {
		await resultPublisher.setMap('result:speaker', { ...data })
	} else {
		await resultPublisher.setMap('result:speaker', {})
	}
}
