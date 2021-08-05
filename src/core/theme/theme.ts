import { ThemeOptions } from './types/main';
import { initializeBreakpoints } from './units/breakpoints';
import { initializeComponentsProps } from './units/components-props';
import { initializeDirection } from './units/direction';
import { initializeMixins } from './units/mixins';
import { initializeOverrides } from './units/overrides';
import { initializePalette } from './units/palette';
import { initializeShadows } from './units/shadows';
import { initializeShape } from './units/shape';
import { initializeSpacing } from './units/spacing';
import { initializeTransitions } from './units/transitions';
import { initializeTypography } from './units/typography';
import { createTheme as createThemeNative } from './utils/theme';

export function createTheme(options?: ThemeOptions) {
  const theme = createThemeNative({
    breakpoints: initializeBreakpoints(options?.breakpoints),
    direction: initializeDirection(options?.direction),
    mixins: initializeMixins(options?.mixins),
    overrides: initializeOverrides(options?.overrides),
    palette: initializePalette(options?.palette),
    props: initializeComponentsProps(options?.props),
    shadows: initializeShadows(options?.shadows),
    shape: initializeShape(options?.shape),
    spacing: initializeSpacing(options?.spacing),
    transitions: initializeTransitions(options?.transitions),
    typography: initializeTypography(options?.typography),
  });

  return theme;
}