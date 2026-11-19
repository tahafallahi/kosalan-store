import { StoreCart } from "@medusajs/types";
import React, { createContext } from "react";

const CartContenxt = createContext<
  [
    StoreCart | null | undefined ,
    setOptimisticCart: ((
      action:
        | StoreCart | null| undefined
        | ((pendingState: StoreCart | null |undefined) => StoreCart | null),
    ) => void),
  ] | null
>(null);

export default CartContenxt;
