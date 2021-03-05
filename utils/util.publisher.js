const IORedis = require('ioredis')
const uuid = require('uuid').v4

class Publisher {
	constructor(configs = { key: '' }) {
		Publisher.key = configs.key
		Publisher.unique = uuid()
		Publisher.set({ key: configs.key, unique: Publisher.unique })
	}

	static get() {
		const options = {
			key: Publisher.key,
			unique: Publisher.unique
		}
		return options
	}

	static set(config = {}) {
		Publisher.key = config.key
		Publisher.unique = config.unique
	}

	redisConnect() {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 100,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true
		})

		return ioRedis
	}

	async setString(keyName = '', data = '') {
		const ioRedis = this.redisConnect()
		await ioRedis.set(`${keyName}:${Publisher.get().unique}`, data)
		await ioRedis.expire(`${keyName}:${Publisher.get().unique}`, 30)
	}

	async setMap(keyName = '', data = {}) {
		const ioRedis = this.redisConnect()
		await ioRedis.hset(`${keyName}:${Publisher.get().unique}`, { payload: JSON.stringify(data) })
		await ioRedis.expire(`${keyName}:${Publisher.get().unique}`, 30)
	}

	async setResponse(data = {}) {
		const ioRedis = this.redisConnect()
		await ioRedis.hset(`response:speaker:${Publisher.get().unique}`, { response: JSON.stringify(data) })
		await ioRedis.expire(`response:speaker:${Publisher.get().unique}`, 30)
	}
}

module.exports = { Publisher }
