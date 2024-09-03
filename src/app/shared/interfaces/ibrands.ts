export interface IBrands {
  results: number;
  metadata: Metadata;
  data: IBrandData[];
}

export interface IBrandData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}