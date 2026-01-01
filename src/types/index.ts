export interface User {
  id: number;
  username: string;
  password: string;
  admin?: boolean;
  accessToken: string;
}

export interface Paging {
  page: number;
  size: number;
}
