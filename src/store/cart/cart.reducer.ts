import { UnknownAction } from "redux"

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types"

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action: UnknownAction ) => {

  if(setCartItems.match(action)){
      return {
        ...state,
        cartItems: action.payload,
      }
  }
   
  if(setIsCartOpen.match(action)){
      return {
        ...state,
        isCartOpen: action.payload,
      }
    }
    
      return state
  
}
