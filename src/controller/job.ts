import { JobModel } from "../model/job";
import { Filter, Job } from "../model/types";
abstract class JobController{
    static async fetchJobs(filters:Filter):Promise<Job[]| string>{
    if(filters.location === undefined) filters.location=''
    if(filters.keywords === undefined) filters.keywords=''
      const jobs = await JobModel.fetchList(filters)  
      if(jobs.length === 0 ) return "No se encontraron resultados para los paramentros de busqueda dados."
      return jobs
    }
}

export {JobController}