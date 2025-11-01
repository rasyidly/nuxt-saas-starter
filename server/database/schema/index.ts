import * as auth from './auth'
import * as relations from './relations'
import * as core from './core'

export const schema = {
    ...auth,
    ...core,
    ...relations
}

// Re-export all entities for direct imports
export * from './auth'
export * from './core'
export * from './relations'
