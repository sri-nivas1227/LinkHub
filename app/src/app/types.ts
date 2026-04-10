export interface Category {
  id: string;
  name: string;
  is_public: boolean;
}

export interface LinkType {
  _id: string;
  title: string;
  url: string;
  visits: number;
  category_id: string;
  updated_id: string;
  tags: string[];
}