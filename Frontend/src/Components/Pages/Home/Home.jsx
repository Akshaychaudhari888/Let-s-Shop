import {useState} from 'react';
import ExploreMenu from '../../ExploreMenu/ExploreMenu';
import Header from '../../Header/Header';
import FoodDisplay from '../../FoodDisplay/FoodDisplay';
import AppDownload from '../../AppDownload/AppDownload.jsx'
import './Home.css';

const Home=()=> {

  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}
export default Home