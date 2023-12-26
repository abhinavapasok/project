import {motion} from 'framer-motion'
import {useState} from 'react'
import FormDialog from './FormDialog'
export default function ApplicationBox({applicationTitle,description,fields,certificateId}){
    const [open,setOpen]=useState(false)
    return(
        <motion.div  whileHover={{scale:1.02}} className="border border-stone-700 bg-sky-100 p-3 rounded-md">
            <h1 className='text-black font-semibold text-md capitalize'>{applicationTitle}</h1>
            <h2 className='text-gray-600 text-sm'>{description}</h2>
            <div className="flex items-center justify-end">
                <button onClick={()=>{setOpen(true)}} className="submit-button-black">Apply</button>
            </div>
            <FormDialog open={open} setOpen={setOpen} field={fields} modalHeading={applicationTitle} certificateId={certificateId}/>
        </motion.div>
    )
}