import React, { useEffect, useState } from 'react'
import AllProductscomponent from './AllProductscomponent';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

const AdminProductcomponent = () => {
    const [expression, setexpression] = useState('All Products');

    const renderContent = () => {
        switch (expression) {
            case 'All Products':
                return <AllProductscomponent changeexpression={setexpression} />;
            case 'Create Product':
                return <CreateProduct />;
            case 'Update Product':
                return <UpdateProduct />
            default:
                return <AllProductscomponent />;
        }
    };
    return (
        <div className='w-full'>
            {
                renderContent()
            }
        </div>
    )
}

export default AdminProductcomponent
