const { setCreatePublisher, setResultPublisher } = require('./publisher')
const { initCreateSubscriber, initResultsSubscriber, initResultSubscriber } = require('./subscriber')
const { getListenerSubscriber } = require('./utils/util.response')

exports.controller = {
	async createController(req, res) {
		await setCreatePublisher({ firstName: req.body.firstName, lastName: req.body.lastName })
		await initCreateSubscriber()
		const response = await getListenerSubscriber()

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
		const response = await getListenerSubscriber()

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
			todos: response.data
		})
	},
	async resultController(req, res) {
		await setResultPublisher({ id: req.params.id })
		await initResultSubscriber()
		const response = await getListenerSubscriber()

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
			todo: response.data
		})
	}
}
