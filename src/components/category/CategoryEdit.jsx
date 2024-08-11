import React from 'react'
import CategoryForm from '../../ui/CategoryForm'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryEdit = () => {
    const { id } = useParams();
    const category = useSelector(state => 
        state.category.categorys.find(category => category.id === id)
    );

    return (
        <div>
            {category && <CategoryForm editingCategory={category} />}
        </div>
    );
}

export default CategoryEdit