const defaultRenderMethod = () => null;

export const getRenderMethod = (method?: () => React.ReactNode) => {
  return method || defaultRenderMethod;
};