import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ButtonProps extends MuiButtonProps {
  text?: React.ReactNode;
  loading?: boolean;
  component?: React.ComponentType<unknown>;
  componentProps?: { [key: string]: unknown };
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  loading,
  children,
  component: Component,
  componentProps,
  color = 'primary',
  ...otherProps
}) => {
  const baseProps: MuiButtonProps = {
    color,
    variant: 'contained',
    size: 'small',
    disabled: loading,
    ...otherProps,
  };

  const spinner = React.useMemo(() => (loading ? <CircularProgress size={15} style={{ marginLeft: 8 }} /> : null), [loading]);

  const content = (
    <MuiButton {...baseProps}>
      {text || children} {spinner}
    </MuiButton>
  );

  if (Component) {
    return <Component {...componentProps}>{content}</Component>;
  }

  return content;
};

export const Button = ButtonComponent;
