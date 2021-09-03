import { Switch, SwitchProps } from 'react-router-dom';
import { Flex } from '../flex';
import { AppRoute } from '../route';

export interface AppSwitchProps extends SwitchProps {
  withNotFound?: boolean;
}

export const AppRouterSwitch: React.FC<AppSwitchProps> = (props) => {
  const { children, withNotFound, ...otherProps } = props;

  const renderNotFound = React.useCallback(() => {
    return (
      <AppRoute
        render={() => (
          <Flex justifyContent="center" alignItems="center" style={{ height: 200 }}>
            Page not found
          </Flex>
        )}
      />
    );
  }, []);

  return (
    <Switch {...otherProps}>
      {children}
      {withNotFound && renderNotFound()}
    </Switch>
  );
};

AppRouterSwitch.defaultProps = {
  withNotFound: true,
};