export interface ICrudControllerService {
    getAll(ctx: any): Promise<any[]>;

    getById(ctx: any): Promise<any>;

    create(ctx: any): Promise<any>;

    delete(ctx: any): Promise<any>;

    update(ctx: any): Promise<any>;
}