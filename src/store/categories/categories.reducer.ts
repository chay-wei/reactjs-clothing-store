import { UnknownAction } from "redux";

import { Category } from "./categories.types"

import { 
  fetchCategoriesStart, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailed 
} from "./categories.action"

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIED_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (
  state = CATEGORIED_INITIAL_STATE as CategoriesState, 
  action = {} as UnknownAction
): CategoriesState => {
  if(fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }
  }

  if(fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false }
  }

  if(fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false }
  }

  return state;
}
