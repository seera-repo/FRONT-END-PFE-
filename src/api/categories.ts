import {apiFetch} from './apiClient';
import type { categoryResponse, Category } from '../types/types';

export async function fetchCategories(): Promise<Category[]> {
   const res = await apiFetch<categoryResponse>('api/categories');
    if (!res.success) {
      throw new Error("Failed to fetch categories");
    }
    return res.data;
}