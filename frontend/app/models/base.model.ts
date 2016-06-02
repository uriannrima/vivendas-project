export class BaseModel {
    public id: number;
    constructor(json?: any) {
        if (json != null) {
            this.id = json.ID;
        }
    }
}