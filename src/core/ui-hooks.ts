import { ComponentType, DependencyList, Dispatch, EffectCallback, SetStateAction } from 'react';
 
import { inject } from './di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { ILogger } from '@shared/types/logger';
 
const useCallback = React.useCallback;
const useEffect = React.useEffect;
const useMemo = React.useMemo;
const useState = React.useState;
 
export function resrictNativeUiHooks() {
  React.useCallback = null as any;
  React.useContext = null as any;
  React.useDebugValue = null as any;
  React.useEffect = null as any;
  React.useImperativeHandle = null as any;
  React.useLayoutEffect = null as any;
  React.useMemo = null as any;
  React.useReducer = null as any;
  React.useState = null as any;
}
 
export class UiHooks {
  private logger = inject<ILogger>(DI_TOKENS.logger);
  private componentName: string;
 
  constructor(component: ComponentType) {
    this.componentName = component.name;
  }
 
  private checkComponentName() {
    if (!this.componentName) {
      throw new Error('Provide component name');
    }
  }
 
  useCallback<T extends (...args: Array<any>) => any>(message: string, callback: T, deps: DependencyList): T {
    this.checkComponentName();
 
    const higherOrderCallback = ((...args: Array<any>) => {
      this.logger.debug(`${this.componentName} | useCallback | ${message}`);
 
      return callback(args);
    }) as T;
 
    return useCallback<T>(
      higherOrderCallback,
      deps
    );
  }
 
  useEffect(message: string, effect: EffectCallback, deps?: DependencyList): void {
    this.checkComponentName();
 
    return useEffect(
      () => {
        this.logger.debug(`${this.componentName} | useEffect | ${message}`);
 
        return effect();
      },
      deps
    );
  }
 
  useMemo<T>(message: string, factory: () => T, deps: DependencyList): T {
    this.checkComponentName();
 
    return useMemo<T>(
      (...args) => {
        this.logger.debug(`${this.componentName} | useMemo | ${message}`);
 
        return factory();
      },
      deps
    );
  }
 
  useState<T = undefined>(message: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    this.checkComponentName();
 
    const [state, setState] = useState(defaultValue);
 
    const set = useCallback(
      (value: SetStateAction<T>) => {
        type GetStateFn = ((prevState: T) => T);
 
        const nextValue = typeof value === 'function' 
          ? (value as GetStateFn)(state)
          : value;
 
        this.logger.debug(`${this.componentName} | useState | ${message} | change to ${nextValue}`);
 
        return setState(value);
      },
      []
    );
  
    return [state, set];
  }
}