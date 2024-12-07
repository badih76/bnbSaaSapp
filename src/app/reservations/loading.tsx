import React from 'react'
import SkeletonLoading from '../my-components/SkeletonCard'

function ReservationsLoading() {
  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight'>My Reservations</h2>

        <SkeletonLoading />        
        

    </section>
  )
}

export default ReservationsLoading