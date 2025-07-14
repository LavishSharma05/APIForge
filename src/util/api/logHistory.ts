import buildHistory from "../RequestHistory/buildHistory"

const logHistory=async()=>{
    const historyData=buildHistory()
    const token = localStorage.getItem("token");
    if (!token) return;   

    try{
        await fetch('/api/auth/history',{
            method:"POST",
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
            method: historyData.method,
            url: historyData.url,
            headers: historyData.headers,
            bodyType: historyData.bodyType,
            requestBody: historyData.requestBody,
            }),
        })
    }
    catch(err){
        console.error("Failed To save history",err);
    }
}

export default logHistory