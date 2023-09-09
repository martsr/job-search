import { readFile } from "jsonfile"
import { Job,SavedJob } from "./types"
import { writeFile } from "jsonfile"
const PATH_TEMPORARY_DB='./src/database/tempJobs.json'
const PATH_SAVED_JOBS='./src/database/jobs.json'
abstract class SearchModel{

    static async byId(jobId:string):Promise<SavedJob|string>{
        const db = await readFile(PATH_TEMPORARY_DB)
        const savedJobs=await readFile(PATH_SAVED_JOBS)
        const result = await db.find((job:Job)=>job.id==Number(jobId))
        if(!result)return "No se encontro un trabajo bajo ese ID"
        const resultInHistory=await this.historyById(Number(jobId))
        if(typeof(resultInHistory) ==='object')return "Este trabajo ya se encuentra en la base de datos"
        const {title,location,source,link, company,id}= result
        const job= {
            id:id,
            title:title,
            location:location,
            source:source,
            link:link,
            company:company,
        }
        savedJobs.push(job)
        writeFile(PATH_SAVED_JOBS,savedJobs)
       return job
    }
    static async historyById(jobId:number):Promise<string|SavedJob>{
        const history= await readFile(PATH_SAVED_JOBS)
        const result=await history.find((job:SavedJob)=>job.id==jobId)
        if(!result)return "No se encontro un trabajo bajo ese ID"
        return result
    }
    static async all(){
        return await readFile(PATH_SAVED_JOBS)
    }
    static async byTitle(title:string):Promise<string|SavedJob[]>{
        const history= await readFile(PATH_SAVED_JOBS)
        const result = await history.filter((job:SavedJob)=>job.title.toLowerCase().includes(title))
        if (result.length ===0)return "No se encontraron resultados para el titulo ingresado"
        return result
    }

    static async byLocation(location:string):Promise<string|SavedJob[]>{
        const history= await readFile(PATH_SAVED_JOBS)
        const result = await history.filter((job:SavedJob)=>job.location.toLowerCase().includes(location))
        if (result.length ===0)return "No se encontraron resultados para la locacion ingresada"
        return result
    }
    static async bySource(source:string):Promise<string|SavedJob[]>{
        const history= await readFile(PATH_SAVED_JOBS)
        const result = await history.filter((job:SavedJob)=>job.source.toLowerCase().includes(source))
        if (result.length ===0)return "No se encontraron resultados para la fuente ingresada"
        return result
    }
    static async byCompany(company:string):Promise<string|SavedJob[]>{
        const history= await readFile(PATH_SAVED_JOBS)
        const result = await history.filter((job:SavedJob)=>job.company.toLowerCase().includes(company))
        if (result.length ===0)return "No se encontraron resultados para la empresa ingresada"
        return result
    }
}


export{SearchModel}