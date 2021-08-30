import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

const appRender = (element: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return render(element, { wrapper: Wrapper, ...options });
};

export { appRender };