import * as React from 'react';
import { render as nativeRender, RenderOptions } from '@testing-library/react';

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

const render = (element: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return nativeRender(element, { wrapper: Wrapper, ...options });
};

export { render };