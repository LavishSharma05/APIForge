import useHistoryStore from "@/store/useHistory"
const setHistory = useHistoryStore.getState().setHistory;

const fetchHistory=async()=>{
    const token=localStorage.getItem("token")
    if(!token) return

    try{
        const res=await fetch('/api/auth/historyFetch',{
            method:"GET",
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        const data=await res.json()

        if(res.ok){
            setHistory(data.history)
        }
        else {
          console.error("Failed to fetch history:", data.error);
        }
    }
    catch(err){
        console.error(err)
    }
}

export default fetchHistory