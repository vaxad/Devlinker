"use server"

import db from "@/lib/prisma";
import { CreateResourceData, CreateResourceRequestData } from "@/lib/types";
import { Resource, ResourceRequest } from "@prisma/client";
import { isLoggedIn } from "./auth";

export async function createResource({ data }: { data: CreateResourceData }): Promise<Resource | null> {
    try {
        const resource = await db.resource.create({
            data: {
                ...data,
                approved: false,
                clicks: 0,
                upvotes: 0,
                downvotes: 0,
                createdAt: new Date(),
            }
        })
        return resource
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getResource({ id }: { id: string }): Promise<Resource | null> {
    try {
        const resource = await db.resource.findUnique({
            where: { id }
        })
        return resource
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createResourceRequest({ data }: { data: CreateResourceRequestData }): Promise<ResourceRequest | null> {
    try {
        const resource = await getResource({ id: data.resourceId });
        if (!resource) return null;
        const resourceRequest = await db.resourceRequest.create({
            data: {
                ...data,
                createdAt: new Date(),
            }
        })
        return resourceRequest
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function approveResource({ id, authToken }: { id: string, authToken: string }): Promise<Resource | null> {
    try {
        const verified = await isLoggedIn({ authToken });
        if (!verified) return null;
        const resource = await db.resource.update({
            where: { id },
            data: { approved: true }
        })
        return resource
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getApprovedResources(): Promise<Resource[]> {
    try {
        const resources = await db.resource.findMany({
            where: { approved: true }
        });
        return resources;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function upvoteResource({ id }: { id: string }): Promise<Resource | null> {
    try {
        const resource = await db.resource.update({
            where: { id },
            data: { upvotes: { increment: 1 } }
        })
        return resource;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function downvoteResource({ id }: { id: string }): Promise<Resource | null> {
    try {
        const resource = await db.resource.update({
            where: { id },
            data: { upvotes: { decrement: 1 } }
        })
        return resource;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function clickResource({ id }: { id: string }): Promise<Resource | null> {
    try {
        const resource = await db.resource.update({
            where: { id },
            data: { clicks: { increment: 1 } }
        })
        return resource;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getResourcesByCategory({ categoryId }: { categoryId: string }): Promise<Resource[]> {
    try {
        const resources = await db.resource.findMany({
            where: { categoryId, approved: true }
        })
        return resources
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getResourcesBySubcategory({ subCategoryId }: { subCategoryId: string }): Promise<Resource[]> {
    try {
        const resources = await db.resource.findMany({
            where: { subCategoryId, approved: true }
        })
        return resources
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getUnapprovedResources(): Promise<Resource[]> {
    try {
        const resources = await db.resource.findMany({
            where: { approved: false }
        })
        return resources
    } catch (error) {
        console.error(error);
        return []
    }
}