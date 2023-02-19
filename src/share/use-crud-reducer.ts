import { Dispatch, useReducer } from 'react';
import { Wrapper } from './wrapper';

export type MessageAction<M> =
  | { type: 'load-init' }
  | { type: 'load-complete'; details: M[] }
  | { type: 'add'; details: M }
  | { type: 'delete'; details: M }
  | { type: 'edit'; details: M }
  | { type: 'update-init' }
  | { type: 'error'; details: Error };

export interface CrudFunctions<M> {
  all: () => Promise<M[]>;
  add: (m: M) => Promise<M>;
  edit: (m: M) => Promise<M>;
  delete: (m: Partial<M>) => Promise<any>;
}

export function useCrudReducer<M>(funcs: CrudFunctions<M>): [Wrapper<M[]>, Dispatch<MessageAction<M>>] {
  const [wrapper, dispatch]: [Wrapper<M[]>, Dispatch<MessageAction<M>>] = useReducer(
    (state: Wrapper<M[]>, action: MessageAction<M>): Wrapper<M[]> => {
      switch (action.type) {
        case 'load-init':
          funcs.all().then(details => dispatch({ type: 'load-complete', details }));
          return new Wrapper<M[]>(null, true);
        case 'load-complete':
          return new Wrapper<M[]>(action.details, false);
        case 'add':
          funcs.add(action.details).then(() => dispatch({ type: 'update-init' }));
          return new Wrapper<M[]>(state.data, true);
        case 'delete':
          funcs.delete(action.details).then(() => dispatch({ type: 'update-init' }));
          return new Wrapper<M[]>(state.data, true);
        case 'edit':
          funcs.edit(action.details).then(() => dispatch({ type: 'update-init' }));
          return new Wrapper<M[]>(state.data, true);
        case 'update-init':
          funcs.all().then(details => dispatch({ type: 'load-complete', details }));
          return new Wrapper<M[]>(state.data, true);
        case 'error':
          return new Wrapper<M[]>(null, false, action.details);
        default:
          throw new Error('Unknown action');
      }
    },
    new Wrapper<M[]>(null, true),
  );

  return [wrapper, dispatch];
}
