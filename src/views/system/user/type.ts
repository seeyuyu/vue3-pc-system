import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '@/store'

// login params
export interface IUserInfo {
  username: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

export interface Profile {
  avatar: string;
  email: string;
  id: number;
  isSuper: boolean;
  mobile: string;
  status: boolean;
  username: string;
  description: string;
  roles: Role[];
  roleIds?: number[]
}

// 定义state类型
export interface IUserState {
  token: string | null;
  userInfo: Profile | null;
  users: Profile[];
  count: number;
  roles: Role[] | null
}

// 查询user参数类型
export interface IUserQuery {
  pageNum?: number;
  pageSize?: number;
  mobile?: string;
  status?: boolean;
  username?: string;
}

// 用户编辑/添加查询类型
export type IProfileQuery = Profile & {
  pageNum?: number;
  pageSize?: number;
}

// mutations类型
type IMutations = MutationTree<IUserState>

// actions类型
type IActions = ActionTree<IUserState, IRootState>
