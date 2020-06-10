export const Attribut: any = (name=null, readOnly = false) => (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    if (readOnly){
      target.readOnlyAttributes.push(name || key);
    }
    const getter = function(this) {
        return this.getAttribute(name || key);
    };
    const setter = function(this, value) {
        this.setAttribute(name || key, value);
    };
    descriptor = descriptor || {};
    descriptor.get = getter;
    descriptor.set = setter;
    return descriptor;
  };

  export const toManyRelation: any = (type_cb) => (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const getter = function(this) {
      return this.hasMany(type_cb(), key);
    };
    descriptor = descriptor || {};
    descriptor.get = getter;
    return descriptor;
  };

  export const toOneRelation: any = (type_cb) => (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const getter = function(this) {
      return this.hasOne(type_cb(), key);
    };
    descriptor = descriptor || {};
    descriptor.get = getter;
    return descriptor;
  };