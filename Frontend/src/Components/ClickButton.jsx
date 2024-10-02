import React from 'react'

function ClickButton({ title, animate, onclickfun = () => { } }) {
    return (
        <button onClick={() => onclickfun()} className={`bg-pink-600 transition-all text-white px-10 max-md:px-6 max-sm:text-sm max-md:font-sm py-2 rounded-lg font-semibold ${animate ? 'hover:animate-bounce transition-all' : ''}`}>{title}</button>

        //className='pl-10 max-sm:p-2 max-md:p-4 max-md:text-sm pr-10 pt-2 pb-2 bg-pink-600 text-white rounded-lg'
    )
}

export default ClickButton
