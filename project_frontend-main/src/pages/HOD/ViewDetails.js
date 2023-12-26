import React from 'react'

function ViewDetails() {
  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-row justify-between w-10/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Hostel Details</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='w-10/12 mt-12 bg-white rounded-xl text-left p-5'>
        <h2 className='font-bold text-lg'>Location</h2>
        <p>The <span className='font-semibold'>Mens hostel</span> is situated behind the college within the campus amidst a glistening panoramic view. The men's hostel has 250 rooms and can accommodate 500 students. </p>
        <p>The <span className='font-semibold'>Ladies hostel</span> is located on the front side of the college at a beautiful location amidst greenish scenery. The ladies hostel has 140 rooms which can accommodate 400 students.</p>
        <h2 className='font-bold text-lg mt-4'>Hostel Facilities</h2>
        <p>Both hostels provide comfortable and conducive atmosphere to develop the innate abilities of inmates. Indoor and outdoor facilities for sports and cultural activities (Reading rooms, Fitness centers with modern scientific equipments) are available in both hostels.</p>
        <h2 className='font-bold text-lg mt-4'>Mess</h2>      
        <p>The mess is run by the mess committee elected from among the students under the directions of the General Secretary, Mess Director and other members of the committee.</p>
        <h2 className='font-bold text-lg mt-4'>MH and LH Day</h2>   
        <p>Hostel day (MH day and LH day) festivities are conducted in both hostels with the active participation of inmates and faculty of the college.</p> 
      </div>
    </div>
  )
}

export default ViewDetails