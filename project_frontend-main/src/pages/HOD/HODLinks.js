import editSvg from'../../icons/edit.svg'
import userSvg from'../../icons/user.svg'
import bookSvg from'../../icons/book.svg'
import fitnessSvg from'../../icons/fitness.svg'

const hodLinks=[
    {
        title:"Students Details",
        to:"HOD/studentsdetails",
        icon: fitnessSvg,
    },
    {
        title:"Add Staff Advisor",
        to:"HOD/addstaffadvisor",
        icon: editSvg,
    },
    {
        title:" View Applications",
        to:"HOD/HodViewApplication",
        icon: bookSvg,
    }
]

export {hodLinks}