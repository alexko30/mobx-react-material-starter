import { NavLink, NavLinkProps } from 'react-router-dom';
import cx from 'classnames';
import MaterialLink, { LinkProps as MaterialLinkProps } from '@material-ui/core/Link';

import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';

import { styles } from './link.styles';

type CoreNavLinkProps = Pick<
  NavLinkProps,
  'activeClassName' | 'activeStyle' | 'exact' | 'strict' | 'isActive' | 'location' | 'to' | 'replace'
>;

type CoreMaterialLinkProps = Omit<MaterialLinkProps, 'classes' | 'component'>;

export interface LinkProps extends AppWithStyles<typeof styles>, CoreNavLinkProps, CoreMaterialLinkProps {}

const LinkComponent: React.FC<LinkProps> = ({ classes, className, children, ...otherProps }) => {
  return (
    <MaterialLink component={NavLink} className={cx(classes.root, className)} {...otherProps}>
      {children}
    </MaterialLink>
  );
};

export const Link = appWithStyles(styles)(LinkComponent);
