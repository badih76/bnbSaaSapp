import React from 'react'
import SkeletonLoading from '../my-components/SkeletonCard'

function FavoritesLoading() {
  return (
    <section className='container mx-auto px-5 pb-16 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Favorites</h2>

        <SkeletonLoading />        
        

    </section>
  )
}

export default FavoritesLoading