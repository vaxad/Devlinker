"use server"

import db from "@/lib/prisma";
import { CreateSubcategoryData } from "@/lib/types";
import { SubCategory } from "@prisma/client";

export async function createSubcategory({ data }: { data: CreateSubcategoryData }): Promise<SubCategory | null> {
    try {
        const subcategory = await db.subCategory.create({
            data: {
                ...data,
                createdAt: new Date(),
                approved: false
            }
        })
        return subcategory
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSubcategory({ id }: { id: string }): Promise<SubCategory | null> {
    try {
        const subcategory = await db.subCategory.findUnique({
            where: { id }
        })
        return subcategory
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function approveSubcategory({ id }: { id: string }): Promise<SubCategory | null> {
    try {
        const subcategory = await db.subCategory.update({
            where: { id },
            data: { approved: true }
        })
        return subcategory
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSubcategories(): Promise<SubCategory[] | null> {
    try {
        const subcategories = await db.subCategory.findMany({
            where: { approved: true }
        })
        return subcategories
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSubcategoriesByCategory({ categoryId }: { categoryId: string }): Promise<SubCategory[]> {
    try {
        const subcategories = await db.subCategory.findMany({
            where: { categoryId, approved: true }
        })
        return subcategories
    } catch (error) {
        console.error(error);
        return [];
    }
}

