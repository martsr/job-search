import { EditModel } from "../model/edit"
import { Job, SavedJob } from "../model/types"

abstract class EditController{
    static async deleteTempDB():Promise<void>{
        EditModel.deleteTempDB()
    }
    static async addComment(id:number, text:string):Promise<string|SavedJob>{
        if(isNaN(id)) return "Por Favor ingrese un ID numerico"
       return EditModel.addComment(id,text)
    }
    static async deleteJob(id:number):Promise<string>{
        if(isNaN(id)) return "Por Favor ingrese un ID numerico"
        return EditModel.deleteByID(id)
    }
}
export{EditController}