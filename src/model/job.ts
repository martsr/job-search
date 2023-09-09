import { Filter,Job } from "./types"
import {writeFile} from 'jsonfile'

const PATH= './src/database/tempJobs.json'
const API_KEY='4e734d8e-1e0f-48fe-a068-278a07656f1a'
const API_BASE_URL= new URL("https://jooble.org/api/")


class NetworkError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'Network Error'
    }
}

abstract class JobModel{
    static async fetchList(filters:Filter):Promise<Job[]|string>{
        const {keywords,location}=filters
        const params = `{keywords:'${keywords}', location:'${location}'}`
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:params
            };
            try{const response = await fetch(API_BASE_URL+API_KEY, requestOptions)
                if(!response.ok) throw new NetworkError(`Request failed with a status ${response.status}`)
                const result = await response.json()
                await writeFile(PATH,result.jobs)
                return result.jobs
            }catch(error){
                if(error instanceof NetworkError){
                    return error.stack as string
            }
            console.log(error)
            return "Error al intentar conectarse con la API"
            
            }
    }
}
export {JobModel}
