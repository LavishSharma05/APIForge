import useRequestStore from "@/store/requestStore"

type historyField={
    id:number,
    method:string,
    url:string,
    headers:Record<string, string>,
    bodyType:string | null,
    requestBody:string | Record<string,string> | null | Record<string, { value: string; type: "text" | "file" }>,
    timestamp:string,
}


const buildHistory=(): historyField=>{
    const {
        method,
        url,
        bodyType,
        requestBody,
        formFields,
        urlEncodedFields,
        headerFields,
    }=useRequestStore.getState()

    const headers:Record<string,string>={}

    for(const {key,value} of headerFields){
        if(key.trim()!=="") headers[key]=value
    }

    let formattedRequestBody: string | Record<string,string> | Record<string,{value: string; type: "text" | "file"}> | null=null 

    if(method!=='GET'){
        if(bodyType==="json"){
            formattedRequestBody=requestBody
        }
        else if (bodyType === "form-data") {
            const formBody: Record<string, { value: string; type: "text" | "file" }> = {};
            for (const field of formFields) {
                if (field.key.trim() !== "") {
                    if(field.type==="file" && field.value instanceof File){
                        formBody[field.key]={
                            value:field.value.name,
                            type: field.type
                        }
                    }
                    else if(field.type==="text" && typeof field.value === "string"){
                        formBody[field.key]={
                            value:field.value,
                            type: field.type
                        }
                    }
                    
                }
            }
            formattedRequestBody=formBody
        }


        else if(bodyType==="x-www-form-urlencoded"){
            formattedRequestBody={}
            for(const {key,value} of urlEncodedFields){
                if(key.trim()!=="") formattedRequestBody[key]=value
            }
        }
        else if(bodyType==="binary"){
            formattedRequestBody=null
        }
    }

    const timestamp=Date.now()

    return{
        id:timestamp,
        method,
        url,
        bodyType,
        headers,
        requestBody:formattedRequestBody,
        timestamp: new Date(timestamp).toISOString(), 
    }
}

export default buildHistory;
