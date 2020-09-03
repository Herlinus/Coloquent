export class Map<T>
{
    protected data: {[key: string]: T};
    protected changed: {[key: string]: T}

    constructor()
    {
        this.data = {};
        this.changed = {};
    }

    public get(key: string): T
    {
        return this.data[key];
    }

    public set(key: string, value: T, original ?: boolean): void
    {
        if (! original)
        {
            this.changed[key] = this.data[key];
        }
        this.data[key] = value;
    }

    public toArray(): {[key: string]: T}
    {
        return this.data;
    }

    public isDirty(): boolean
    {
        for (let key of Object.keys(this.changed))
        {
            if (this.changed[key] !== this.data[key])
                return true
        }
        return false
    }
    public hasChanged(key: string): boolean
    {
        return this.changed.hasOwnProperty(key) && this.data[key] !== this.changed[key]
    }
    public flushChanged(): void
    {
        this.changed = {};
    }
}