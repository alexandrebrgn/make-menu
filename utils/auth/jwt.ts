import { SignJWT, jwtVerify } from 'jose'
import { createSecretKey } from 'crypto'

// Clé secrète pour signer les JWT (à mettre dans .env en production)
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
)

export interface JWTPayload {
    userId: number
    email: string
    role: string
    type: 'access' | 'refresh'
}

// Générer un access token (court)
export async function generateAccessToken(payload: Omit<JWTPayload, 'type'>): Promise<string> {
    return new SignJWT({ ...payload, type: 'access' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m') // 15 minutes
        .sign(JWT_SECRET)
}

// Générer un refresh token (long)
export async function generateRefreshToken(payload: Omit<JWTPayload, 'type'>): Promise<string> {
    return new SignJWT({ ...payload, type: 'refresh' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // 7 jours
        .sign(JWT_SECRET)
}

// Vérifier et décoder un token
export async function verifyToken(token: string): Promise<JWTPayload> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload as JWTPayload
    } catch (error) {
        throw new Error('Token invalide ou expiré')
    }
}

// Générer les deux tokens
export async function generateTokens(user: { id: number; email: string; role: string }) {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
    }

    const [accessToken, refreshToken] = await Promise.all([
        generateAccessToken(payload),
        generateRefreshToken(payload)
    ])

    return { accessToken, refreshToken }
}