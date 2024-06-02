export interface ICategory {
  id: string;
  name: string;
  image?: string;
  orderIndex: number;
  createdAt?: string;
}

export interface ICreateCategory {
  name: string;
  image: File;
}

export interface IChangeCategory
  extends Pick<ICreateCategory, 'name' | 'image'> {
  id: string;
}
