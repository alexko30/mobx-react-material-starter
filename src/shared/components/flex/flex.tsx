import { Grid, GridProps } from '@shared/components/grid';

export interface FlexProps extends GridProps {
  autoWidth?: boolean;
}

export const Flex: React.FC<FlexProps> = ({ autoWidth, ...otherProps }) => {
  return <Grid style={autoWidth ? { width: 'auto' } : {}} container {...otherProps} />;
};

Flex.defaultProps = {
  autoWidth: true,
};