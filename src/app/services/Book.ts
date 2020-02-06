import { User } from './User';

export class Book{

    bookId : number;
    author : string;
    bookCondition : string;
    bookName : string;
    branchName : string;
    discount : string;
    edition : string;
    imageLinkFront : string;
    imageLinkBack : string;
    deleteFront: string;
    deleteBack: string;
    originalPrice : number;
    page : string;
    publication : string;
    publishedYear : string;
    seen : string;
    sellingPrice : number;         
    semester: string;
    status: boolean;
    subjectCode: string;
    subjectName: string;
    user: User;

    constructor() {
        
    }
}