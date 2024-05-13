import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen p-16 md:p-32 lg:pl-96 lg:pr-96'>
      <div>
        <div>
          <h1 className='text-3xl font-bold text-center my-7'>About ENLIGHTEN Nest</h1>
          <h1 className='font-semibold text-center p-3'>Welcome to ENLIGHTEN Nest!</h1>

          <div className='text-md text-gray-500 flex flex-col gap-6 dark:text-gray-400'>
            <p>
            This blog was established by Saurabh Kumar Singh as a personal endeavor to share insights and perspectives with the world. Saurabh is an enthusiastic developer with a penchant for exploring technology, coding, and everything in between.
            </p>
            <p>On this platform, expect to discover weekly articles and tutorials covering a broad spectrum of topics, including web development, software engineering, and various programming languages. Saurabh is committed to continuous learning and stays abreast of emerging technologies, ensuring a steady stream of fresh content.</p>

            <p>We encourage active participation from our readers. Feel free to leave comments on our posts and engage with fellow readers. You can also like and reply to other people's comments. We firmly believe that fostering a community of learners fosters mutual growth and improvement.

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About