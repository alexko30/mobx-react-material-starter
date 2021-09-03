import { ManageMode } from './management';

export const ROUTES = {
  public: {
    login: '/login',
    passwordCreating: '/password-creating',
    passwordRecovery: '/password-recovery',
    accountActivating: '/account-activating',
  },
  private: {
    passwordChanging: '/password-changing',
    users: {
      root: '/users',
      children: {
        management: (id = ':id?') => `${ROUTES.private.users.root}/:manageMode(${ManageMode.edit}|${ManageMode.create})/${id}`,
        details: (id = ':id') => `${ROUTES.private.users.root}/${ManageMode.view}/${id}`,
      }
    }
  },
  initial: '/'
};