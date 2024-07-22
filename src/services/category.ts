"use server"

import db from "@/lib/prisma";
import { CreateCategoryData, CreateCategoryRequestData, GetCategoriesWithSubCategories, GetCategoriesWithSubCategoriesAndResources } from "@/lib/types";
import { Category, CategoryRequest } from "@prisma/client";
import { isLoggedIn } from "./auth";

export async function createCategory({ data }: { data: CreateCategoryData }): Promise<Category | null> {
    try {
        const category = await db.category.create({
            data: {
                ...data,
                createdAt: new Date(),
                approved: false
            }
        })
        return category
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createCategoryRequest({ data }: { data: CreateCategoryRequestData }): Promise<CategoryRequest | null> {
    try {
        const categoryReq = await db.categoryRequest.create({
            data: {
                ...data,
                createdAt: new Date(),
            }
        })
        return categoryReq
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCategory({ id }: { id: string }): Promise<Category | null> {
    try {
        const category = await db.category.findUnique({
            where: { id }
        })
        return category
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function approveCategory({ id, authToken }: { id: string, authToken: string }): Promise<Category | null> {
    try {
        const verified = await isLoggedIn({ authToken });
        if (!verified) return null;
        const category = await db.category.update({
            where: { id },
            data: { approved: true }
        })
        return category
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCategories(): Promise<Category[] | null> {
    try {
        const categories = await db.category.findMany({
            where: { approved: true }
        })
        return categories
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUnapprovedCategories(): Promise<Category[] | null> {
    try {
        const categories = await db.category.findMany({
            where: { approved: false }
        })
        return categories
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getCategoriesWithSubCategoriesAndResources(): Promise<GetCategoriesWithSubCategoriesAndResources> {
    try {
        const categories = await db.category.findMany({
            where: { approved: true },
            include: {
                subCategories: {
                    where: { approved: true },
                    include: {
                        resources: {
                            where: { approved: true }
                        }
                    }
                }
            }
        })
        return categories as unknown as GetCategoriesWithSubCategoriesAndResources
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getCategoriesWithSubCategories(): Promise<GetCategoriesWithSubCategories> {
    try {
        const categories = await db.category.findMany({
            where: { approved: true },
            include: {
                subCategories: {
                    where: { approved: true }
                }
            }
        })
        return categories as unknown as GetCategoriesWithSubCategories
    } catch (error) {
        console.error(error);
        return []
    }
}


