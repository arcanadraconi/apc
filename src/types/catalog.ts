export interface ProductSpecification {
  partNumber: string;
  diameter: string;
  lengthOfCut: string;
  shankDiameter: string;
  overallLength: string;
  radius?: string;
  taperAngle?: string;
  neckLength?: string;
}

export type DimensionType = 'metric' | 'fractional' | 'extra-long';

export interface Specification extends ProductSpecification {
  flutes?: number;
  coating?: string;
  dimensionType?: DimensionType;
}

export interface ProductVariants {
  twoFlute?: string;
  threeFlute?: string;
  fourFlute?: string;
  sixFlute?: string;
  twoFlutePowerA?: string;
  threeFlutePowerA?: string;
  fourFlutePowerA?: string;
  sixFlutePowerA?: string;
  uncoated?: string;
  powerA?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  subType?: string;
  description: string;
  image: string;
  specifications: Specification;
  variants: ProductVariants;
  technicalDrawing?: string;
  notes?: string;
}

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

// Helper type for CSV processing
export interface CSVFormat {
  hasRadius?: boolean;
  hasTaperAngle?: boolean;
  hasNeckLength?: boolean;
  hasSixFlute?: boolean;
  columns: string[];
}

// Quote related interfaces
export interface QuoteItem {
  id: string;
  quantity: number;
  specs: string;
}

export interface ComponentProps {
  onAddToQuote: (item: QuoteItem) => void;
}

// High Performance Endmills specific interfaces
export interface ToolData {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  'PowerA No Flat': string;
  'PowerA With Flat': string;
  [key: string]: string; // Index signature for variant access
}

export interface HighPerformanceEndmillsProps {
  onAddToQuote: (item: QuoteItem) => void;
}
