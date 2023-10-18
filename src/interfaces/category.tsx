export interface Department {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  outstanding: boolean;
  visible: boolean;
  image?: string;
  categories: Category[];
}

export interface Category {
  uuidCategory: string;
  uuidDepartment: string;
  name: string;
  description?: string;
  active: boolean;
  visible: boolean;
  subcategories: Subcategory[];
}

export interface Subcategory {
  uuidSubCategory: string;
  uuidCategory: string;
  name: string;
  description?: string;
  active: boolean;
  visible: boolean;
}

export interface Brand {
  id: string;
  name: string;
}
