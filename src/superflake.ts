export interface SuperflakeOptions {
	nodeId?: number
	timeOffset?: number
}

export class Superflake {
	private sequence: number = 0
	private lastTime: number = 0

	private nodeId: number = 1
	private timeOffset: number = 0

	constructor(options: SuperflakeOptions) {
		this.nodeId = (options.nodeId || this.nodeId) % 1023
		this.timeOffset = options.timeOffset || this.timeOffset
	}

	gen(): string {
		const nowTime = Date.now()
		const genTime = (nowTime - this.timeOffset).toString(2)

		this.sequence = 0
	
		if (this.lastTime === nowTime) {
			this.sequence += 1

			if (this.sequence > 4095) {
				this.sequence = 0

				while (Date.now() <= nowTime) { }
			}
		}

		this.lastTime = nowTime

        const genSequence = this.sequence.toString(2).padStart(12, '0')
		const genNode = this.nodeId.toString(2).padStart(10, '0')
		const rawId = genTime + genNode + genSequence

		let id = ''

		for (let i = rawId.length; i > 0; i -= 4) {
			id = parseInt(rawId.substring(i - 4, i), 2).toString(16) + id
		}

		return `${BigInt(`0x${id}`)}`
	}
}