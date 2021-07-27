import { ManageMode } from './management';

export const ROUTES = {
  public: {
    login: '/login',
    newPassword: '/new-password',
    forgotPassword: '/forgot-password',
    accountActivate: '/account-activate',
  },
  private: {
    changePassword: '/change-password',
    users: {
      root: '/users',
      children: {
        userEdit: (id = ':id') => `${ROUTES.private.users.root}/${id}/${ManageMode.edit}`
      }
    }
  },
  initial: '/'
};