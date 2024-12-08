import React from 'react'
import Hero from '../Component/Hero'
import LatestCollection from '../Component/LatestCollection'
import BestSellers from '../Component/BestSellers'
import Ourpolicy from '../Component/Ourpolicy'
import Letterbox from '../Component/Letterbox'

const Home = () => {
  return (
    <>
    <Hero />
    <LatestCollection/>
    <BestSellers/>
    <Ourpolicy/>
    <Letterbox/>
    </>
  )
}

export default Home