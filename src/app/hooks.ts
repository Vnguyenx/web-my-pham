// src/app/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Hook useDispatch đã typed
 *
 * Cách dùng:
 * const dispatch = useAppDispatch();
 * dispatch(someAction());
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook useSelector đã typed
 *
 * Cách dùng:
 * const items = useAppSelector(state => state.wishlist.items);
 * const user = useAppSelector(state => state.auth.user);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;