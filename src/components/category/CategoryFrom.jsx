import React from 'react'

const CategoryFrom = ({ _this }) => {
    return (
        <form className='flex gap-4' onSubmit={_this?.handleSubmit}>
            <input
                type="text"
                placeholder='add new category...'
                className='text-base shadow-normal px-2 py-1 rounded-sm sm:w-1/3'
                value={_this?.categoryName}
                onChange={(e) => {
                    _this?.setCategoryName(e.target.value)
                }}
            />
            <button type='submit' className='bg-blue-700 px-6 capitalize text-white rounded hover:bg-blue-600 transition-colors duration-300'>add</button>
        </form>
    )
}

export default CategoryFrom