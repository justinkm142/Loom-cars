import React from 'react'

function Footer() {
  return (
<footer aria-label="Site Footer" className="bg-black">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-center text-white text-3xl font-bold sm:justify-start">
        <h1>Loom Cars </h1>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        Copyright &copy; 2023. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer
