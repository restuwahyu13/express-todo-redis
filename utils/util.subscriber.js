const IORedis = require('ioredis')
const { Publisher } = require('./util.publisher')

class Subscriber {
	constructor(configs = { key: '' }) {
		this._key = configs.key
		this._keyFrom = Publisher.get()
	}

	_redisConnect() {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 50,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true
		})

		return ioRedis
	}

	async getString(keyName) {
		const ioRedis = this._redisConnect()
		const response = await ioRedis.get(keyName)
		await ioRedis.expire(keyName, 60)
		if (response) {
			return Promise.resolve(response)
		}
		return {}
	}

	async getMap(keyName) {
		const ioRedis = this._redisConnect()
		const response = await ioRedis.hgetall(keyName)
		await ioRedis.expire(keyName, 60)
		if (response) {
			return Promise.resolve(response)
		}
		return {}
	}

	async getArray(keyName) {
		const ioRedis = this._redisConnect()
		const response = await ioRedis.hgetall(keyName)
		await ioRedis.expire(keyName, 60)
		if (response) {
			return Promise.resolve(JSON.parser(response).data)
		}
		return {}
	}

	async getResponse() {
		const ioRedis = this._redisConnect()
		const response = await ioRedis.hgetall('message:speaker')
		await ioRedis.expire('message:speaker', 30)
		if (response) {
			return Promise.resolve(response)
		}
		return {}
	}
}

module.exports = { Subscriber }
