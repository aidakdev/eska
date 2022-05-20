import { warn } from './logger'
import { randomBytes } from 'crypto'
import { Superflake } from './superflake'

const VALID_PREFIX = /^[a-z0-9_]+$/
const DEFAULT_TIMESTAMP = 1616275800 // Mar 20 2021

export interface EskaOptions {
    prefix: EskaPrefixRecord
    customBytes?: number
    customTimestamp?: number
}

export interface EskaPrefixRecord {
    content: string
    allowsLowercase?: boolean
}

export class Eska {
    prefix: EskaPrefixRecord
    customBytes?: number
    customTimestamp?: number

    constructor(options: EskaOptions) {
        this.prefix = options.prefix
        this.customBytes = options.customBytes
        this.customTimestamp = options.customTimestamp
    }

    generate() {
        if (!VALID_PREFIX.test(this.prefix.content) && !this.prefix.allowsLowercase) {
            warn('Eska ID prefixes should be lowercased. To ignore this, set `allowsLowercase` in the prefix object.')
        }
    
        let random = randomBytes(this.customBytes ?? 8).toString('hex')
        let superflake = new Superflake({ nodeId: 1, timeOffset: DEFAULT_TIMESTAMP })
    
        return `${this.prefix.content}_${superflake.gen()}${random}`
    }
}