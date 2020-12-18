import React from 'react'
import Pagination from './Utils/Pagination';

function Category() {
    return (
        <div className="personalisedNews__wrapper">
            <div className="container">
                <Pagination />
                <div>Hello From Category Personalization</div>
            </div>
        </div>
    )
}

export default Category
