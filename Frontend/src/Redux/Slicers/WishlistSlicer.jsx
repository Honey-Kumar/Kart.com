import { createSlice } from "@reduxjs/toolkit";

const WishlistSlicer = createSlice({
    name: 'WishList',
    initialState: {
        wishlist: []
    },
    reducers: {
        addtolist: (state, action) => {
            state.wishlist.push(action.payload)
        },
        removefromlist: (state, action) => {
            const wishlistArray = Array.from(state.wishlist);
            console.log("Current Wishlist:", wishlistArray);

            console.log("ID to Remove:", action.payload);
            const index = wishlistArray.findIndex(item => item.id === action.payload);
            console.log("Found Index:", index);

            if (index !== -1) {
                state.wishlist.splice(index, 1);
            }
        },

        clearWishList: (state) => {
            console.log('Clearing the entire WishList.');
            state.wishlist = [];
        }
    }
})

export const WishlistAction = WishlistSlicer.actions
export default WishlistSlicer