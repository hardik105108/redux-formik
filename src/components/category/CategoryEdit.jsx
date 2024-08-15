import React, { useEffect } from 'react'
import CategoryForm from '../../ui/CategoryForm'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById } from '../../store/categorySlice';

const CategoryEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const category = useSelector(state => state.category.selectedCategory);
    const status = useSelector(state => state.category.status);

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoryById(id));
        }
    }, [dispatch, id]);

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading category.</p>}
            {category && <CategoryForm editingCategory={category} />}
        </div>
    );
}

export default CategoryEdit;