import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../prisma/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter})

type CsvRow = Record<string, string | number>

type CategoryRow = {
    id: string
    name: string
    slug: string
    description: string
}

type FoodReferenceRow = {
    name: string
    category_id: number
    unit: string
    defaultQuantity: string
    description: string
    slug: string
}

function parseCsv<T extends CsvRow>(text: string): T[] {
    const lines = text
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const headers = lines.shift()?.split(',').map((header) => header.trim())
    if (!headers) {
        return []
    }

    return lines.map((line) => {
        const values = line.split(',').map((value) => value.trim())
        const row = {} as CsvRow
        headers.forEach((header, index) => {
            row[header] = values[index] ?? ''
        })
        return row as T
    })
}

async function main() {
    const dataDir = path.resolve(process.cwd(), 'data')

    const categoriesText = await fs.readFile(path.join(dataDir, 'categories.csv'), 'utf8')
    const foodText = await fs.readFile(path.join(dataDir, 'food-references.csv'), 'utf8')

    const categories = parseCsv<CategoryRow>(categoriesText)
    const foodReferences = parseCsv<FoodReferenceRow>(foodText)

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {
                name: category.name,
                description: category.description,
            },
            create: {
                name: category.name,
                slug: category.slug,
                description: category.description,
            },
        })
    }

    for (const food of foodReferences) {
        const category = await prisma.category.findUnique({
            where: { id: Number(food.category_id) },
        })

        if (!category) {
            console.warn(`Catégorie introuvable pour ${food.name} : ${food.category_id}`)
            continue
        }

        await prisma.foodReference.upsert({
            where: { slug: food.slug },
            update: {
                name: food.name,
                unit: food.unit,
                defaultQuantity: food.defaultQuantity ? parseFloat(food.defaultQuantity) : undefined,
                description: food.description,
                categoryId: category.id,
            },
            create: {
                name: food.name,
                slug: food.slug,
                unit: food.unit,
                defaultQuantity: food.defaultQuantity ? parseFloat(food.defaultQuantity) : undefined,
                description: food.description,
                categoryId: category.id,
            },
        })
    }

    console.log('✅ Seed des catégories et références alimentaires terminé')
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
