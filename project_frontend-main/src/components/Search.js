const optimizedSearch=({searchText, originalData, filters})=>{

    console.log("here222",{searchText, originalData, filters})
    var result=[]

    if(searchText=="")
        return originalData.map(item=>({...item}))

    if(filters.length==0)
    {
        originalData.forEach(objectItem=>{
            for(var key in objectItem)
            {
                if(String(objectItem[key]).includes(searchText))
                {
                    result.push({...objectItem})
                    break
                }
            }
        })
    }
    else{
        console.log("hereenetered, ",originalData)
        originalData.forEach(objectItem=>{
            for(var index in filters)
            {
                if(String(objectItem[filters[index]]).includes(searchText))
                {
                    result.push({...objectItem})
                    break;
                }
            }
        })
    }

    return result
}

export default optimizedSearch