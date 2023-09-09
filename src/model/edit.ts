import { readFile, writeFile } from "jsonfile"
import { Job } from "./types"

const PATH_TEMPORARY_DB='./src/database/tempJobs.json'
const PATH_HISTORY='./src/database/jobs.json'
abstract class EditModel{
    static async deleteTempDB():Promise<void>{
        writeFile(PATH_TEMPORARY_DB,[])
    }

    static async addComment(id:number,text:string):Promise<string | Job>{
        const history = await readFile(PATH_HISTORY)
        const indexOfSelectedJob=history.findIndex((job:Job)=>job.id===id)
        if(indexOfSelectedJob=== -1) return "No se encontro un trabajo bajo ese ID"
        const foundJob=history[indexOfSelectedJob]
        foundJob.comment= text
        history.splice(indexOfSelectedJob,1,foundJob)
        writeFile(PATH_HISTORY,history)
        return foundJob
    }

    static async deleteByID(id:number):Promise<string>{
        const history = await readFile(PATH_HISTORY)
        const indexOfSelectedJob=history.findIndex((job:Job)=>job.id===id)
        if(indexOfSelectedJob=== -1) return "No se encontro un trabajo bajo ese ID"
        history.splice(indexOfSelectedJob,1)
        writeFile(PATH_HISTORY,history)
        return "Se elimino correctamente el trabajo seleccionado"
    }
}

export {EditModel}