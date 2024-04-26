export interface Photo {
  id: string;
  alt_description: string;
  likes: number;
  imgUrl: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
}
