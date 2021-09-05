import { IObservableFactory, makeObservable } from 'mobx';
export { observable as appObservable, computed as appComputed } from 'mobx';
export { observer as appObserver } from 'mobx-react';

export const appMakeObservable = (target: object, annotations: { [key: string]: IObservableFactory }) =>
  makeObservable(target, annotations);
