import {editarPayload,eliminarLlavePayload } from "../../commons/funcionesComplementos";
import { expect } from "@playwright/test";

export class servicioCrearUsuario_body {
    private payload: any;
    constructor() {
        this.reset();
    }
    reset(): void {
        this.payload = {
            "email": "tico@gamil.com",
            "name": "string",
            "password": "string",
            "role": "admin",
            "avatar": "www.google.com"
            }
    }

    toJsonBody(): string {
        return JSON.stringify(this.payload);
    }
    actualizarPayload(path: string, value: any): void {
        editarPayload(this.payload, path, value);
    }
    removerLlavePayload(path: string): void {
        eliminarLlavePayload(this.payload, path);
    }
}