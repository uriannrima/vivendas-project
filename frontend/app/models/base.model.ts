export class BaseModel {
    constructor(public id?: number) {

    }

    public fromJSON(json: any) {
        this.id = json.ID;
    };
}