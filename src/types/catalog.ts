export interface ProductSpecification {
  partNumber: string;
  diameter: string;
  lengthOfCut: string;
  shankDiameter: string;
  overallLength: string;
}

export interface Specification extends ProductSpecification {
  flutes?: number;
  coating?: string;
}

export interface ProductVariants {
  twoFlute?: string;
  threeFlute?: string;
  fourFlute?: string;
  twoFlutePowerA?: string;
  threeFlutePowerA?: string;
  fourFlutePowerA?: string;
  uncoated?: string;
  powerA?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  specifications: Specification;
  variants: ProductVariants;
}

export type DimensionType = 'metric' | 'fractional' | 'extra-long';

export interface SubType {
  id: string;
  name: string;
  description: string;
  dimensionType: DimensionType;
  specifications: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  specifications: string[];
  subTypes?: SubType[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  subcategories: Subcategory[];
}
