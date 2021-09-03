import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';
import { AppRoute, AppRouteProps } from '@shared/components/route';
import { AppRouterSwitch } from '@shared/components/router-switch';
import { ROUTES } from '@shared/constants/routes';

import { styles } from './users.styles';

const UserList = React.lazy(() => import('./pages/user-list'));
const UserManagement = React.lazy(() => import('./pages/user-management'));

export interface UsersProps extends AppWithStyles<typeof styles> {

}

const Users: React.FC<UsersProps> = (props) => {
  const components = React.useMemo((): Array<AppRouteProps & { key: string }> => {
    return [
      { component: UserList, path: ROUTES.private.users.root, key: ROUTES.private.users.root },
      { component: UserManagement, path: ROUTES.private.users.children.management(), key: ROUTES.private.users.children.management() },
    ]




    




    
  }, []);

  return (
    <div>
      <AppRouterSwitch>
        {components.map(({ key, ...routeProps }) => (
          <AppRoute key={key} {...routeProps} />
        ))}
      </AppRouterSwitch>
    </div>
  )
}
const t="2";
export default appWithStyles(styles)(Users)