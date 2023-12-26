import React, {useCallback,useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {motion} from 'framer-motion'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Sheets from '../icons/sheets.png'
import * as XLSX from 'xlsx'
function Uploader({uploaded,setUploaded,jsonData,setJsonData}) {
  const [fileName,setFileName]=useState("")
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((uploadedfile) => {
      setFileName(uploadedfile.name)
      setUploaded(true)
      const reader=new FileReader();
        reader.onload = (e)=>{
            const bstr = e.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });
            var worksheet = workbook.Sheets['Sheet1'];
            
            //getting the complete sheet
            // console.log(worksheet);

            var headers = {};
            var data = [];
            for (var z in worksheet) {
                if (z[0] === "!") continue;
                //parse out the column, row, and value
                var col = z.substring(0, 1);
                // console.log(col);
            
                var row = parseInt(z.substring(1));
                // console.log(row);
            
                var value = worksheet[z].v;
                // console.log(value);
            
                //store header names
                if (row == 1) {
                    headers[col] = value;
                    // storing the header names
                    continue;
                }
            
                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            console.log(data);
            setJsonData(data);  
        }
        reader.readAsBinaryString(uploadedfile);
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <>
      {uploaded?
        <motion.div className='flex items-center justify-center w-12/12 bg-gray-100 h-40'>
          <img src={Sheets} className="w-8"/> {fileName}
          <DeleteForeverIcon onClick={()=>{setUploaded(false)}} className="ml-2"/>
        </motion.div>:
        <motion.div className="bg-gray-100 w-12/12 h-40 p-5 rounded-lg m-5">
          <div {...getRootProps({className:'dropzone'})} className="border-dashed border-2 border-teal-500 rounded-lg w-full h-full flex items-center justify-center">
            <input {...getInputProps()} className="w-full h-full"/>
            <img src={Sheets} className="w-8" alt="" />
            <p>Drag and drop excel file</p>
          </div>
        </motion.div>
      }
    </>
  )
}
export default Uploader