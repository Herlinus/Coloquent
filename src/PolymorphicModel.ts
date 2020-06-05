import {Model} from "./Model";

export class PolymorphicEntry {
    public constructor(public klass: any, public value: string){
  
    }
    public isTheGood(type: string): boolean{
      return type === this.value;
    }
  }

export class PolymorphicMapping{
    public constructor(public polymorphicEntries: PolymorphicEntry[]){
  
    }
    getClass(type: string): typeof Model | typeof PolymorphicEntry | null{
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
    public static appendPolymorph(value: string){
      let that = this
      return function appendPolymorph_(klass: any) {
        klass.JsonApiBaseType_ = that.getJsonApiBaseType();
        that.polymorphicOn.polymorphicEntries.push( new PolymorphicEntry(klass, value));
        return klass;
    }
  }
    public static getClass(doc: any){
      return this.polymorphicOn.getClass(doc.type) || this;
    }
}