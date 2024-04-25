export interface Category {
  id: number;
  typeName: string;
  typeEnable: string;
  typeParentId?: string;
  typeParentName?: string;
  typeImg?: string;
  children: Category[];
}

export type FormCategory = Omit<Category, "id"> & {
  id?: number;
  typeImgs: any;
};

export type FilterParams = {
  typeName?: string;
  typeEnable?: boolean;
};
