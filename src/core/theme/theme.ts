import { AppThemeOptions } from './types/main';
import { initializeBreakpoints } from './units/breakpoints';
import { initializeComponentsProps } from './units/components-props';
import { initializeDirection } from './units/direction';
import { initializeMixins } from './units/mixins';
import { initializeOverrides } from './units/overrides';
import { initializePalette } from './units/palette';
// import { initializeShadows } from './units/shadows';
import { initializeShape } from './units/shape';
import { initializeSpacing } from './units/spacing';
import { initializeTransitions } from './units/transitions';
import { initializeTypography } from './units/typography';
import { appCreateTheme as appCreateThemeCore } from './utils/theme';

export function appCreateTheme(options?: AppThemeOptions) {
  const palette = initializePalette(options?.palette);

  const theme = appCreateThemeCore({
    breakpoints: initializeBreakpoints(options?.breakpoints),
    direction: initializeDirection(options?.direction),
    mixins: initializeMixins(options?.mixins),
    overrides: initializeOverrides(palette, options?.overrides),
    props: initializeComponentsProps(options?.props),
    // shadows: initializeShadows(options?.shadows),
    shape: initializeShape(options?.shape),
    spacing: initializeSpacing(options?.spacing),
    transitions: initializeTransitions(options?.transitions),
    typography: initializeTypography(options?.typography),
  });

  return theme;
}
