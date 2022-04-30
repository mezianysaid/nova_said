import { course } from './course.model';
export class Blog{
    _id?:String;
    title?:String;
    image?:String;
    module?:String;
    courses?:Array<course>
}