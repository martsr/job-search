interface Filter{
    keywords?:string;
    location?:string;
    search?:boolean | string;
    id?:number;
    searchHistory?:string;
    title?:string;
    source?:string;
    company?:string;
    addComment?:boolean;
    comment?:string;
    deleteJob?:boolean;
}

interface Job{
    title:string;
    location:string;
    snippet:string;
    salary:string;
    source: string;
    type:string;
    link: string;
    company: string;
    updated: string;
    id:number;
}

interface SavedJob{
    id:number;
    title:string;
    location:string;
    source:string;
    link:string;
    company:string;
    comment?:string;
}
type ProcessedArgvs= Filter | string


export {Filter, ProcessedArgvs,Job,SavedJob}