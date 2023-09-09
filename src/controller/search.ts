import { SearchModel} from "../model/search";

abstract class SearchController{
    static async byId(id:string){
        if(isNaN(Number(id))) return "Por favor Ingrese valores nuemricos"
        return await SearchModel.byId(id) 
    }
    static async all(){
        return SearchModel.all()
    }
    static async historyById(id:number){
        if(isNaN(id)) return "Por favor Ingrese valores nuemricos"
        return await SearchModel.historyById(id) 
    }
    static async byTitle(title:string){
        return await SearchModel.byTitle(title.toLowerCase())
    }
    static async byLocation(location:string){
        return await SearchModel.byLocation(location.toLowerCase())
    }
    static async bySource(source:string){
        return await SearchModel.bySource(source.toLowerCase())
    }
    static async byCompany(company:string){
        return await SearchModel.byCompany(company.toLowerCase())
    }
}

export {SearchController}