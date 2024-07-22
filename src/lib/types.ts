import { Category, CategoryRequest, Resource, ResourceRequest, SubCategory } from "@prisma/client";

// general
export type OmitKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// resource
export type CreateResourceData = OmitKeys<Resource, "id" | "approved" | "createdAt" | "clicks" | "upvotes" | "downvotes">;

// resourceRequest
export type CreateResourceRequestData = OmitKeys<ResourceRequest, "id" | "createdAt">;

//category
export type CreateCategoryData = OmitKeys<Category, "id" | "createdAt" | "approved">;
export type CreateCategoryRequestData = OmitKeys<CategoryRequest, "id" | "createdAt">;
export type GetCategoriesWithSubCategoriesAndResources = (Category & { resources: Resource[], subCategories: SubCategory[] })[];

// subcategory
export type CreateSubcategoryData = OmitKeys<SubCategory, "id" | "createdAt" | "approved">;
export type GetCategoriesWithSubCategories = (Category & { subCategories: SubCategory[] })[];

//auth
export type LoginData = {
    email: string;
    password: string;
}

export type AuthResponse = {
    authToken: string;
}