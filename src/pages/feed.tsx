import { useEffect } from "react"
import PcSearchBar from "../components/pc/PcSearchBar"

function Feed (){

    useEffect(() =>{
        document.body.style.backgroundColor = "#000000"
    }, [])

    return(<>
        <PcSearchBar/>
    </>)
}

export default Feed