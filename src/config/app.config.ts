export const env: string = process.env.NODE_ENV as 'development' | 'test' | 'production'
export const appKeys: string[] = ['VEDANETWORK']
export const hmacAlgorithm: string = 'sha256'
export const encoding: string = 'hex'
export const jwtToken: string = process.env.SECRET_JWT_TOKEN as string
