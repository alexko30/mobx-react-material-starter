import { AppTooltip } from '@shared/components/tooltip';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';
import { ObjectLike } from '@shared/types/object';

import { styles } from './ellipsis.styles';

export interface EllipsisProps extends AppWithStyles<typeof styles> {
  text: string | number | React.ReactNode;
  tooltipText?: string;
  component?: React.ElementType;
  componentProps?: ObjectLike;
  width?: string | number;
  maxWidth?: string | number;
  withTooltip?: boolean;
}

const EllipsisComponent: React.FC<EllipsisProps> = ({
  classes,
  width,
  maxWidth,
  text,
  tooltipText,
  withTooltip,
  component: Component,
  componentProps,
}) => {
  const contentStyles = Component ? { maxWidth: '100%' } : { width, maxWidth };

  const content = (
    <>
      {withTooltip ? (
        <AppTooltip placement="top-start" title={tooltipText || String(text) || ''}>
          <div style={contentStyles} className={classes.root}>
            {text}
          </div>
        </AppTooltip>
      ) : (
        <div style={contentStyles} className={classes.root}>
          {text}
        </div>
      )}
    </>
  );

  if (Component) {
    return (
      <Component style={{ width, maxWidth: maxWidth || '100%' }} {...componentProps}>
        {content}
      </Component>
    );
  }

  return content;
};

EllipsisComponent.defaultProps = {
  withTooltip: true,
};

export const Ellipsis = appWithStyles(styles)(EllipsisComponent);
