const IORedis = require('ioredis')
const chalk = require('chalk')
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
		if (this._key == this._keyFrom) {
			const ioRedis = this._redisConnect()
			const response = await ioRedis.get(keyName)
			await ioRedis.expire(keyName, 60)
			if (response) {
				return Promise.resolve(response)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this._key} and Publisher: ${this._keyFrom}`)))
		}
	}

	async getMap(keyName) {
		if (this._key == this._keyFrom) {
			const ioRedis = this._redisConnect()
			const response = await ioRedis.hgetall(keyName)
			await ioRedis.expire(keyName, 60)
			if (response) {
				return Promise.resolve(response)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this._key} and Publisher: ${this._keyFrom}`)))
		}
	}

	async getArray(keyName) {
		if (this._key == this._keyFrom) {
			const ioRedis = this._redisConnect()
			const response = await ioRedis.hgetall(keyName)
			await ioRedis.expire(keyName, 60)
			if (response) {
				return Promise.resolve(JSON.parser(response).data)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this._key} and Publisher: ${this._keyFrom}`)))
		}
	}

	async getResponse() {
		if (this._key == this._keyFrom) {
			const ioRedis = this._redisConnect()
			const response = await ioRedis.hgetall('message:speaker')
			await ioRedis.expire('message:speaker', 30)
			if (response) {
				return Promise.resolve(response)
			}
			return {}
		} else {
			return Promise.reject(chalk.red(new Error(`invalid key Subscriber: ${this._key} and Publisher: ${this._keyFrom}`)))
		}
	}
}

module.exports = { Subscriber }
