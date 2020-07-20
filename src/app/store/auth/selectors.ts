import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { User } from '../../models';

import { State } from './state';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.loading;

const getAuthenticated = (state: State): boolean => state.authenticated;

const getUser = (state: State): any => state.user;

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('auth');

export const selectAuthError: MemoizedSelector<object, any> = createSelector(
  selectAuthState,
  getError
);

export const selectAuthIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectAuthState, getIsLoading);

export const selectAuthenticated: MemoizedSelector<
  object,
  boolean
> = createSelector(selectAuthState, getAuthenticated);

export const selectAuthUser: MemoizedSelector<
  object,
  User
> = createSelector(selectAuthState, getUser);