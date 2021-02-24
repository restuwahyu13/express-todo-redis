const todoModel = require('./model')
const { Subscriber } = require('./utils/util.subscriber')
const { setResponsePublisher } = require('./utils/util.message')

const createSubscriber = new Subscriber({ key: 'Create' })
const resultSubscriber = new Subscriber({ key: 'Result' })

exports.initCreateSubscriber = async () => {
	try {
		const { firstName, lastName } = await createSubscriber.getMap('create:speaker')

		const checkTodo = await todoModel.find({ $or: [{ firstName }, { lastName }] }).lean()

		if (checkTodo.length > 0) {
			await setResponsePublisher({
				status: 409,
				message: 'todo already exists'
			})
		} else {
			const addTodo = await todoModel.create({ firstName, lastName })

			if (!addTodo) {
				await setResponsePublisher({
					status: 403,
					message: 'add new todo failed'
				})
			}

			await setResponsePublisher({
				status: 200,
				message: 'add new todo successfully'
			})
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}

exports.initResultsSubscriber = async () => {
	try {
		const resultsAllTodo = await todoModel.findOne({}).lean()

		if (resultsAllTodo.length < 1) {
			await setResponsePublisher({
				status: 409,
				message: 'todo is not exist'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'all todo already to use',
				data: JSON.stringify({ todos: resultsAllTodo })
			})
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}

exports.initResultSubscriber = async () => {
	try {
		const { id } = await resultSubscriber.getMap('result:speaker')

		const resultAllTodo = await todoModel.findById({ _id: id }).lean()

		if (!resultAllTodo) {
			await setResponsePublisher({
				status: 409,
				message: 'todo is not exist'
			})
		} else {
			await setResponsePublisher({
				status: 200,
				message: 'all todo already to use',
				data: JSON.stringify({ todo: resultAllTodo })
			})
		}
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
