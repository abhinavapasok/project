const RenderModal=(item)=>{
    setModal(
        <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
          <div className='flex flex-col bg-white rounded-2xl w-5/12 h-1/2 pt-3 relative overflow-hidden'>

            <div
                      // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                      className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                      onClick={()=>{
                          setModal(null)
                      }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  
                  
              </div>
          </div>
      )

  }
export default RenderModal
