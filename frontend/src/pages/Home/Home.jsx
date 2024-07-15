import React, { useState, useContext } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import PetDisplay from '../../components/PetDisplay/PetDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../Context/StoreContext'


const Home = () => {
  const { user } = useContext(StoreContext)
  console.log(user)

  const [category,setCategory] = useState("All")

  return (
    <>
      
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <PetDisplay user={user} category={category}/>
      <AppDownload/>
      
    </>
  )
}

export default Home
