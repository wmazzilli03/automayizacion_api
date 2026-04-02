import { APIResponse } from "@playwright/test";
import { apiManager } from "../../commons/commons_hooks";;

export default class ServicioListarProductos {
    async listarProductos(): Promise<APIResponse> {
        const peticion = await apiManager.getContext();
        const responseData = await peticion.get("/api/v1/products", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return responseData;
    }
}