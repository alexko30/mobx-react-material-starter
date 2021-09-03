import { appObserver } from '@core/state-management/utils';
import { ErrorHandler } from '@shared/components/error-handler';
import { Loading } from '@shared/components/loading';
import { AppRouteComponentProps } from '@shared/components/route';
import { UserListViewModel } from './user-list.vm';

export interface AppProps extends AppRouteComponentProps { }

const UserList: React.FC<AppProps> = appObserver(() => {
  const $vm = React.useMemo(() => new UserListViewModel(), []);

  React.useEffect(() => {
    $vm.getUsers();
  }, []);

  if ($vm.error.usersGet) {
    return <ErrorHandler />;
  }

  if ($vm.loading.users) {
    return <Loading size={70} />;
  }

  return (
    <div>
      {$vm.users.map((x) => (
        <h6 key={x.asJson.email}>
          {x.asJson.email}
        </h6>
      ))}
    </div>
  );
});

export default UserList;