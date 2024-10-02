import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlicer from "./Slicers/Products";
import { persistStore, persistReducer } from "redux-persist";
import WishlistSlicer from "./Slicers/WishlistSlicer";
import UserSlicer from "./Slicers/UserSlicer";
import CartSlicer from "./Slicers/CartSlicer";
import storage from "redux-persist/lib/storage";
import OrderSlicer from "./Slicers/OrderSlicer";
import AdminSlice from "./Slicers/AdminSlicer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["Products", "User", "Cart", "Wishlist", "Order", "Admin"],// Only persist specific slices
    keyPrefix: ''
};

const rootReducer = combineReducers({
    Products: ProductSlicer.reducer,
    Wishlist: WishlistSlicer.reducer,
    Cart: CartSlicer.reducer,
    User: UserSlicer.reducer,
    Order: OrderSlicer.reducer,
    Admin: AdminSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Needed for redux-persist compatibility
        }),
})

const persistor = persistStore(store);


// // Clear persisted state on logout. It causing Maximum stack increase error that's why to clear persists state when user logout direct purge in logout code
// store.subscribe(async () => {
//     await persistor.purge(); // Clear persisted state
// });

export { store, persistor };
