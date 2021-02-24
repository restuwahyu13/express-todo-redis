const IORedis = require('ioredis')

class Publisher {
	constructor(configs = { key: '' }) {
		this.key = configs.key
		Publisher.set(configs.key)
	}

	static get() {
		return this.key
	}

	static set(key = '') {
		this.key = key
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

	async setString(keyName = '', data) {
		const ioRedis = _redisConnect()
		await ioRedis.set(keyName, data)
	}

	async setMap(keyName = '', data = {}) {
		const ioRedis = this._redisConnect()
		await ioRedis.hmset(keyName, { ...data })
	}

	async setArray(keyName = '', data = []) {
		const ioRedis = _redisConnect()
		await ioRedis.hmset(keyName, JSON.stringify({ data: data }))
	}

	async setResponse(data = {}) {
		const ioRedis = this._redisConnect()
		await ioRedis.hmset('message:speaker', { ...data })
	}
}

module.exports = { Publisher }
