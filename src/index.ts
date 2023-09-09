import { EditController } from "./controller/edit";
import { JobController } from "./controller/job";
import { SearchController } from "./controller/search";
import { Filter, ProcessedArgvs } from "./model/types";
import minimist from "minimist";

function stringValidation(param:string){
    return (!isNaN(Number(param)) || param.length===0)? true :false
}

function processArgvs(parameters :string[]):ProcessedArgvs{
    const processedParams=minimist(parameters)
    const {searchHistory,search,keywords,location,id,title,source,company,addComment,comment,deleteJob}=processedParams
    
    if(searchHistory &&parameters.length ===2){
        if(searchHistory==='all')return{searchHistory}
        if(id)return {searchHistory,id}
        if(title){
            if (stringValidation(title)) return "Por favor ingrese un valor correcto para el campo titulo"
            return{searchHistory,title}
        } 
        if(location){
            if(stringValidation(location))return "Por favor ingrese un valor correcto para el campo location"
            return{searchHistory,location}
        }
        if(source){
            if(stringValidation(source))return "Por favor ingrese un valor correcto para el campo source"
            return{searchHistory,source}
        }
        if(company){
            if(stringValidation(company))return "Por favor ingrese un valor correcto para el campo company"
            return{searchHistory,company}
        }
    } 

    if(search){
        if(!keywords && !location) return "Error porfavor ingrese o una locacion o minimo un keyword para poder buscar trabajos."
        return{search,keywords,location}
    }
    if(addComment && id && comment) return {addComment,id,comment}
    if(deleteJob && id) return {deleteJob, id}
    
    return "Error en los datos ingresados, por favor verifique los paramentros e intente nuevamente."
}

function executeTasks(params:Filter){
    const {searchHistory,search,keywords,location,id,title,source,company,addComment,comment,deleteJob}=params
    if (searchHistory==='all'){
        return SearchController.all()
    }
    if(searchHistory && location) return SearchController.byLocation(location)
    if(addComment&&id&&comment) return EditController.addComment(id, comment)
    if(deleteJob && id) return EditController.deleteJob(id)
    if(id) return SearchController.historyById(id)
    if(title) return SearchController.byTitle(title)
    if(source) return SearchController.bySource(source)
    if(company) return SearchController.byCompany(company)
    if(search)return JobController.fetchJobs({keywords,location})
   
    
}

async function executeJobSave():Promise<void>{ 
        while(true){
        const promt = await require('prompt-sync')()
        const answer=await promt("Si quiere guardar un trabajo por favor ingrese el ID, caso contrario presione enter: ")
        if(answer.length ===0)break
            const savedJob = await  SearchController.byId(answer)
            console.log(savedJob) 
        }
        EditController.deleteTempDB()
        return 
   
}

(function main():void{
    const params=process.argv.slice(2)
    const processedParams=processArgvs(params)
    if(typeof(processedParams)!= 'object'){
        console.log(processedParams)
        return
    }
    const result =executeTasks(processedParams)
    result?.then((data)=>{
        console.log(data)
        if(processedParams.search) executeJobSave() 
    })
     
    })()