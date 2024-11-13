export interface ProductSpecification {
  diameter: string;
  lengthOfCut: string;
  shankDiameter: string;
  overallLength: string;
  flutes?: number;
  coating?: string;
  partNumber: string;
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
  specifications: ProductSpecification;
  variants: ProductVariants;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  dimensionType: 'metric' | 'fractional';
  specifications: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  subcategories: Subcategory[];
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Quote {
  id: string;
  items: QuoteItem[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  customerNotes?: string;
}

// Helper types for CSV parsing
export interface MetricCSVRow {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  "2Flute": string;
  "3Flute": string;
  "4Flute": string;
  "2Flute - PowerA": string;
  "3Flute - PowerA": string;
  "4Flute - PowerA": string;
}

export interface FractionalCSVRow {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  "2-Flute": string;
  "3-Flute": string;
  "4 Flute": string;
  "2-Flute PowerA": string;
  "3- Flute PowerA": string;
  "4 Flute PowerA": string;
}

export interface ExtraLongCSVRow {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  Uncoated: string;
  PowerA: string;
}
