const data = require('../data/newData.json');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const categoryId = '669f37d9246378ddde2e28ae'
    const SubCategoryId = '669f9a70914879a43265161f';
    // Read all category folders
    const resources = data;

    for (const resource of resources) {
        // Create resource in the database
        let createdResource;
        try {
            createdResource = await prisma.resource.create({
                data: {
                    name: resource.name,
                    description: resource.description,
                    url: resource.url,
                    createdAt: new Date(),
                    approved: true,
                    clicks: 0,
                    upvotes: 0,
                    downvotes: 0,
                    categoryId: categoryId,
                    subCategoryId: SubCategoryId,
                }
            });
            console.log("createdResource", createdResource.id);
        } catch (err) {
            console.error(err);
            continue;
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
