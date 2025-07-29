import React from 'react'

function FeaturedVideos() {

  const images = [
    {
      title: 'Chotta Bheem With Aliens',
      alt: 'Chota Bheem with Aliens',
      src: '/images/chotta-Bheem.png'
    },
    {
      title: 'Dhurandar',
      alt: 'Dhurandar',
      src: '/images/Dhurandar.png'
    },
    {
      title: 'Maa',
      alt: 'Maa',
      src: '/images/Maa.png'
    },
    {
      title: 'Mortal',
      alt: 'Mortal',
      src: '/images/mortal.png'
    },
    {
      title: 'Narsimha',
      alt: 'Narsimha',
      src: '/images/Narsimha.png'
    },
     {
      title: 'Housefull 5',
      alt: 'Housefull 5',
      src: '/images/Housefull.png'
    },
  ]

  return (
    <div className='bg-black flex justify-center items-center'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {images.map((image, index) => (
          <div key={index}
          className=' flex flex-col justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 hover:ring-1 hover:ring-red-500 m-5'>
            <img src={image.src} alt={image.alt}
            className='h-[200px] md:h-[270px] grow-1'
            />
           
          </div>
        ))}

      </div>
    </div>
  )
}

export default FeaturedVideos