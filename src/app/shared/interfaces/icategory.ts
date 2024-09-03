
export interface ICategory {
  results: number;
  metadata: Metadata;
  data: ICategoryDetails[];
}

export interface ICategoryDetails {
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
}