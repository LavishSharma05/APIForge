// import { create } from "zustand";

// const useRequestStore = create((set) => ({
//   method: "GET",
//   url: "",
//   requestBody: "",
//   responseStatus: "",
//   responseBody: "",
//   loading: false,
//   bodyType: "json",
//   error: "",
//   formFields: [{ id: 1, key: "", value: "", type: "text", description: "" }],
//   urlEncodedFields: [{id: 1, key:"", value:"", description:""}],
//   binaryBody: null,
//   headerFields: [{ id: 1, key: "", value: "", description: "" }],
//   headersVisible:false,
//   setField: (field, value) => set({ [field]: value }),

//   addFormField: () =>
//     set((state) => ({
//       formFields: [
//         ...state.formFields,
//         { id: Date.now(), key: "", value: "", type: "text", description: "" },
//       ],
//     })),

//   removeFormField:(id)=>
//     set((state)=>({
//       formFields:state.formFields.filter((field)=> field.id!==id)
//     })),

//   updateFormField:(id,fieldName,newValue)=>
//     set((state)=>({
//       formFields:state.formFields.map((field)=> field.id===id ? {...field,[fieldName]:newValue}: field)
//     })),

//   addUrlEncodedField: () =>
//     set((state) => ({
//       urlEncodedFields: [
//         ...state.urlEncodedFields,
//         { id: Date.now(), key: "", value: "", description: "" },
//       ],
//     })),

//   removeUrlEncodedField:(id)=>
//     set((state)=>({
//       urlEncodedFields:state.urlEncodedFields.filter((field)=> field.id!==id)
//     })),

//   updateUrlEncodedField:(id,fieldName,newValue)=>
//     set((state)=>({
//       urlEncodedFields:state.urlEncodedFields.map((field)=> field.id===id ? {...field,[fieldName]:newValue}: field)
//     })),

//   addHeaderField: () =>
//     set((state) => ({
//       headerFields: [
//         ...state.headerFields,
//         { id: Date.now(), key: "", value: "", description: "" },
//       ],
//     })),

//   removeHeaderField:(id)=>
//     set((state)=>({
//       headerFields:state.headerFields.filter((field)=> field.id!==id)
//     })),

//   updateHeaderField:(id,fieldName,newValue)=>
//     set((state)=>({
//       headerFields:state.headerFields.map((field)=> field.id===id ? {...field,[fieldName]:newValue}: field)
//     })),

//   reset: () =>
//     set({
//       method: "GET",
//       url: "",
//       requestBody: "",
//       responseStatus: "", 
//       responseBody: "",
//       loading: false,
//       error: "",
//       bodyType: "json",
//       formFields: [
//         { id: 1, key: "", value: "", type: "text", description: "" },
//       ],
//       urlEncodedFields: [{id: 1, key:"", value:"", description:""}],
//       binaryBody: null,
//       headerFields: [{ id: 1, key: "", value: "", description: "" }],
//       headersVisible:false,
//     }),
// }));

// export default useRequestStore;
