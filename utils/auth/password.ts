import bcrypt from 'bcrypt'

// Nombre de rounds pour le hash (plus c'est élevé, plus c'est sécurisé mais lent)
const SALT_ROUNDS = 12

// Hasher un mot de passe
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
}

// Vérifier un mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

// Valider la force du mot de passe
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 8 caractères')
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins une majuscule')
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins une minuscule')
    }

    if (!/\d/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un chiffre')
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un caractère spécial')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}