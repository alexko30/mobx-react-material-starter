import { AppGrid, AppGridProps } from '@shared/components/grid';

export interface FlexProps extends AppGridProps {
  autoWidth?: boolean;
}

export const Flex: React.FC<FlexProps> = ({ autoWidth, ...otherProps }) => {
  return <AppGrid style={autoWidth ? { width: 'auto' } : {}} container {...otherProps} />;
};

Flex.defaultProps = {
  autoWidth: true,
};