/*
const { Category, Resource, SubCategory, PrismaClient } = require("@prisma/client");
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const databasePath = path.join(__dirname, '../database');

    // Read all category folders
    const categories = fs.readdirSync(databasePath);

    for (const category of categories) {
        const categoryPath = path.join(databasePath, category);
        const subcategories = fs.readdirSync(categoryPath);

        let createdCategory: typeof Category;
        // Create category in the database
        try {
            createdCategory = await prisma.category.create({
                data: {
                    name: category,
                    description: ``,
                    createdAt: new Date(),
                    approved: true,
                },
            });
        } catch (error) {
            console.error(error);
            continue;
        }

        console.log("createdCategory", createdCategory.id);
        for (const subcategory of subcategories) {
            const subcategoryPath = path.join(categoryPath, subcategory);
            const resourcesData = JSON.parse(fs.readFileSync(subcategoryPath, 'utf-8'));
            let createdSubCategory: typeof SubCategory;
            // Create subcategory in the database
            try {
                createdSubCategory = await prisma.subCategory.create({
                    data: {
                        name: subcategory.replace('.json', ''),
                        description: ``,
                        createdAt: new Date(),
                        approved: true,
                        categoryId: createdCategory.id,
                    },
                });
            } catch (error) {
                console.error(error);
                continue
            }

            console.log("createdSubCategory", createdSubCategory.id);

            for (const resource of resourcesData) {
                // Create resource in the database
                let createdResource: typeof Resource;
                try {
                    createdResource = await prisma.resource.create({
                        data: {
                            name: resource.name,
                            description: resource.description,
                            url: resource.url,
                            clicks: 0,
                            createdAt: new Date(),
                            approved: true,
                            upvotes: 0,
                            downvotes: 0,
                            categoryId: createdCategory.id,
                            subCategoryId: createdSubCategory.id,
                        },
                    });
                } catch (error) {
                    console.error(error);
                    continue;
                }
                console.log("createdResource", createdResource.id);
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

    */