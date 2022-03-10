import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@material-ui/core/Avatar';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';
import cx from 'classnames';

import { Loading } from '@shared/components/loading';
import { getColor } from '@shared/utils/color';

import { styles } from './avatar.styles';

interface AvatarProps extends Omit<MuiAvatarProps, 'classes'>, AppWithStyles<typeof styles> {
  src?: string;
  fullName?: string;
  loadingSize?: number;
}

const AvatarComponent: React.FC<AvatarProps> = ({ src, fullName, classes, loadingSize, ...other }) => {
  const [loading, setLoading] = React.useState<boolean>(src ? true : false);

  const name = React.useMemo(
    () =>
      fullName
        ?.split(' ')
        .map((x) => x[0])
        .join('')
        .substr(0, 2),
    [fullName],
  );

  const getBackgroundColor = React.useCallback(() => {
    if (fullName) {
      const nameCodesSum = fullName?.split('').reduce((acc, char): number => acc + char.charCodeAt(0), 0);

      return getColor(nameCodesSum);
    }

    return '#DEE0E4';
  }, [fullName]);

  const handleLoaded = React.useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = React.useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <MuiAvatar
        {...other}
        src={src}
        alt={fullName}
        style={{ background: getBackgroundColor() }}
        classes={{ root: cx(classes.root, { [classes.rootHidden]: loading }) }}
        onLoad={handleLoaded}
        onError={handleError}
      >
        {name}
      </MuiAvatar>
      {loading && <Loading size={loadingSize} classes={{ root: classes.root }} />}
    </>
  );
};

AvatarComponent.defaultProps = {
  loadingSize: 12,
};

export const Avatar = appWithStyles(styles)(AvatarComponent);
