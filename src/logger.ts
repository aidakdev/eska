const prefix = '[eska]'

export const warn = (...args: unknown[]) => {
    console.warn(prefix, ...args)
}

export const error = (...args: unknown[]) => {
    console.error(prefix, ...args)
}
