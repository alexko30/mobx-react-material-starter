import { IObservableFactory, makeObservable } from 'mobx';
export { observable as appObservable, computed as appComputed } from 'mobx';
export { observer as appObserver } from 'mobx-react';

export const appMakeObservable = <T>(target: T, annotations: { [key: string]: IObservableFactory }) => makeObservable<any>(target, annotations);