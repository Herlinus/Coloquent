import {Model} from "./Model";

export class PolymorphicEntry {
    public constructor(public klass: Model | PolymorphicEntry, public value: string){
  
    }
    public isTheGood(type: string): boolean{
      return type === this.value;
    }
  }

export class PolymorphicMapping{
    public constructor(public polymorphicEntries: PolymorphicEntry[]){
  
    }
    getClass(type: string): Model | PolymorphicEntry | null{
      for (const entry of this.polymorphicEntries){
        if (entry.isTheGood(type))
        {
          return entry.klass;
        }
      }
      return null;
    }
  }


export interface PolymorphicModel {
    constructor: typeof PolymorphicModel;
}

export abstract class PolymorphicModel extends Model{
    public static polymorphicOn = new PolymorphicMapping([
    ]);
    public  abstract  getJsonApiBaseType(): string;
    public static appendPolymorphisme(klass: PolymorphicModel, value: string): void{
      this.polymorphicOn.polymorphicEntries.push( new PolymorphicEntry(klass, value));
    }
    public static getClass(doc: any){
      return this.polymorphicOn.getClass(doc.type) || this;
    }
}