import { APIResponse } from "@playwright/test";
import { apiManager } from "../../commons/commons_hooks";;


export default class ServicioCrearUsuario {
    async crearUsuario(body: string): Promise<APIResponse> {
        const peticion = await apiManager.getContext();
        const responseData = await peticion.post("/api/v1/users", {
            headers: {
                "Content-Type": "application/json",
            },
            data: body
        });
        return responseData;
    }
}