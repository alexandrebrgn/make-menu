import { PrismaClient } from '../prisma/generated/prisma'
import { hashPassword } from '../utils/auth/password'

const prisma = new PrismaClient()

async function createTestUser() {
    try {
        // Créer un utilisateur de test
        const hashedPassword = await hashPassword('Test123!')

        const user = await prisma.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                email: 'test@example.com',
                password: hashedPassword,
                firstname: 'Test',
                lastname: 'User',
                role: 'USER',
                isActive: true,
            },
        })

        // Créer quelques aliments de test
        const foods = await prisma.food.createMany({
            data: [
                {
                    name: 'Tomates',
                    quantity: 5,
                    unit: 'pièces',
                    category: 'Légumes',
                    userId: user.id,
                },
                {
                    name: 'Lait',
                    quantity: 1,
                    unit: 'litre',
                    category: 'Produits laitiers',
                    userId: user.id,
                },
                {
                    name: 'Pain',
                    quantity: 1,
                    unit: 'pièce',
                    category: 'Boulangerie',
                    userId: user.id,
                },
            ],
        })

    } catch (error) {
        console.error('❌ Erreur lors de la création des données de test:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createTestUser()