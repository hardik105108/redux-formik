import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BankList from '../bank/BankList'
import Login from '../auth/Login'
import NetworkList from '../netwrok/NetworkList'
import CategoryList from '../category/categoryList'
import CategoryAdd from '../category/CategoryAdd'
import CategoryEdit from '../category/CategoryEdit'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/bank-list' element={<BankList />} />
            <Route path='/network-list' element={<NetworkList />} />
            <Route path='/category-list' element={<CategoryList />} />
            <Route path='/category-add' element={<CategoryAdd />} />
            <Route path='/category-edit/:id' element={<CategoryEdit />} />
        </Routes>
    )
}

export default AllRoutes