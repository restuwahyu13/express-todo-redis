const todoModel = require('./model')
const { Subscriber } = require('./utils/util.subscriber')
const { setSpeakerPublisher } = require('./utils/util.response')

exports.initCreateSubscriber = async () => {
	const createSubscriber = new Subscriber({ key: 'Create' })
	const { firstName, lastName } = await createSubscriber.getMap('create:speaker')
	try {
		const checkTodo = await todoModel.find({ $or: [{ firstName }, { lastName }] }).lean()

		if (checkTodo.length > 0) {
			await setSpeakerPublisher({
				status: 409,
				message: 'todo already exists'
			})
		} else {
			const addTodo = await todoModel.create({ firstName, lastName })

			if (!addTodo) {
				await setSpeakerPublisher({
					status: 403,
					message: 'add new todo failed'
				})
			}

			await setSpeakerPublisher({
				status: 200,
				message: 'add new todo successfully'
			})
		}
	} catch (err) {
		await setSpeakerPublisher({
			status: 500,
			message: `internal server error: ${err}`
		})
	}
}

exports.initResultsSubscriber = async () => {
	try {
		const resultsAllTodo = await todoModel.find({}).lean()

		if (resultsAllTodo.length < 1) {
			await setSpeakerPublisher({
				status: 409,
				message: 'todo is not exist'
			})
		} else {
			await setSpeakerPublisher({
				status: 200,
				message: 'all todo already to use',
				data: resultsAllTodo
			})
		}
	} catch (err) {
		await setSpeakerPublisher({
			status: 500,
			message: `internal server error: ${err}`
		})
	}
}

exports.initResultSubscriber = async () => {
	const resultSubscriber = new Subscriber({ key: 'Result' })
	const { id } = await resultSubscriber.getMap('result:speaker')
	try {
		const resultAllTodo = await todoModel.findById({ _id: id }).lean()

		if (!resultAllTodo) {
			await setSpeakerPublisher({
				status: 409,
				message: 'todo is not exist'
			})
		} else {
			await setSpeakerPublisher({
				status: 200,
				message: 'all todo already to use',
				data: resultAllTodo
			})
		}
	} catch (err) {
		await setSpeakerPublisher({
			status: 500,
			message: `internal server error: ${err}`
		})
	}
}
