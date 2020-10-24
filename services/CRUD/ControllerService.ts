import {RepositoryService} from "./RepositoryService.ts";
import {ICrudControllerService} from "./ICrudControllerService.ts";

/*
* This Service help to make a CRUD  controller class
* */
export class ControllerService implements ICrudControllerService {
    constructor(private readonly repositoryService: RepositoryService) {

    }

    async getAll(ctx: any) {
        const result = await this.repositoryService.findAll();
        ctx.response.type = "json";
        ctx.response.body = result;
        return ctx.response;
    }

    async getById(ctx: any) {
        const id = ctx.params.id;
        const result = await this.repositoryService.findById(id)
        ctx.response.type = "json";
        ctx.response.body = result;
        return ctx.response;
    }

    async create(ctx: any) {
        const body = await ctx.request.body().value;
        const newDoc = await this.repositoryService.insert(body);
        ctx.response.body = newDoc;
        return ctx.response;
    }

    async delete(ctx: any) {
        const body = await ctx.request.body().value;
        const deleteCount = await this.repositoryService.delete(body.id);
        if (deleteCount > 0) {
            ctx.response.body = {message: "deleted"};
        } else {
            ctx.response.body = {message: "not deleted"};
        }
        return ctx.response;
    }

    async update(ctx: any) {
        const id = ctx.params.id;
        const body = await ctx.request.body().value;
        const update = await this.repositoryService.update(id, body);
        ctx.response.body = "update";
        return ctx.response;
    }
}