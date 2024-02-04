export interface Category {
  id: number;
  typeCode: string;
  typeName: string;
  typeMemo?: string;
}

export type FormCategory = Omit<Category, "id"> & { id?: number };
