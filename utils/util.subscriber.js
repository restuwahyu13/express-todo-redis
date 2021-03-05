const IORedis = require('ioredis')
const chalk = require('chalk')
const { Publisher } = require('./util.publisher')

class Subscriber {
	constructor(config = { key: '' }) {
		this.keyTo = config.key
		this.keyFrom = Publisher.get().key
		this.uniqueId = Publisher.get().unique
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

	async getString(keyName = '') {
	if (this.keyTo == this.keyFrom) {
			const ioRedis = this.redisConnect()
			const response = await ioRedis.get(`${keyName}:${this.uniqueId}`)
			if (response) {
				return Promise.resolve(response)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this.keyTo} and Publisher: ${this.keyFrom}`)))
		}
	}

	async getMap(keyName = '') {
	if (this.keyTo == this.keyFrom) {
			const ioRedis = this.redisConnect()
			const response = await ioRedis.hgetall(`${keyName}:${this.uniqueId}`)
			if (response) {
				return Promise.resolve(JSON.parse(response.payload))
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this.keyTo} and Publisher: ${this.keyFrom}`)))
		}
	}

	async getResponse() {
	const ioRedis = this.redisConnect()
		const response = await ioRedis.hgetall(`response:speaker:${this.uniqueId}`)
		if (response) {
			return Promise.resolve(JSON.parse(response.response))
		}
		return {}
	}
}

module.exports = { Subscriber }
