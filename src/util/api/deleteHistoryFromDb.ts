const deleteAllHistoryFromDB=async()=>{
    const token=localStorage.getItem("token")
    if(!token) return;

    try{
        const res=await fetch('/api/auth/clearHistory',{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await res.json();

        if (res.ok) {
            console.log("History cleared from DB and state");
        } else {
            console.error("Failed to clear history:", data.error);
        }
    }
    catch(err){
        console.error(err)
    }
}

export default deleteAllHistoryFromDB