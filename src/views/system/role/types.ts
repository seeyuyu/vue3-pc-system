export interface IRole {
  id: number;
  name: string;
  description: string;
  // eslint-disable-next-line camelcase
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义state类型
export interface IRoleState {
  roles: IRole[];
  count: number;
}
