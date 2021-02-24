const { setCreatePublisher, setResultPublisher } = require('./publisher')
const { initCreateSubscriber, initResultsSubscriber, initResultSubscriber } = require('./subscriber')
const { getResponseSubscriber } = require('./utils/util.message')
const { toObject } = require('./utils/util.parse')

exports.controller = {
	async createController(req, res) {
		await setCreatePublisher({ firstName: req.body.firstName, lastName: req.body.lastName })
		await initCreateSubscriber()
		const response = await getResponseSubscriber()

		if (response.status >= 400) {
			return res.status(response.status).json({
				method: req.method,
				status: res.statusCode,
				message: response.message
			})
		}
		return res.status(response.status).json({
			method: req.method,
			status: res.statusCode,
			message: response.message
		})
	},
	async resultsController(req, res) {
		await initResultsSubscriber()
		const response = await getResponseSubscriber()

		if (response.status >= 400) {
			return res.status(response.status).json({
				method: req.method,
				status: res.statusCode,
				message: response.message
			})
		}
		return res.status(response.status).json({
			method: req.method,
			status: res.statusCode,
			message: response.message,
			todos: toObject(response.data)
		})
	},
	async resultController(req, res) {
		await setResultPublisher({ id: req.params.id })
		await initResultSubscriber()
		const response = await getResponseSubscriber()

		if (response.status >= 400) {
			return res.status(response.status).json({
				method: req.method,
				status: res.statusCode,
				message: response.message
			})
		}
		return res.status(response.status).json({
			method: req.method,
			status: res.statusCode,
			message: response.message,
			todo: toObject(response.data)
		})
	}
}
