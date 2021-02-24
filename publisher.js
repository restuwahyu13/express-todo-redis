const { Publisher } = require('./utils/util.publisher')

const createPublisher = new Publisher({ key: 'Create' })
const resultPublisher = new Publisher({ key: 'Result' })

exports.setCreatePublisher = async (data) => {
	if (data) {
		await createPublisher.setMap('create:speaker', { ...data })
	} else {
		await createPublisher.setMap('create:speaker', {})
	}
}

exports.setResultPublisher = async (data) => {
	if (data) {
		await resultPublisher.setMap('result:speaker', { ...data })
	} else {
		await resultPublisher.setMap('result:speaker', {})
	}
}
