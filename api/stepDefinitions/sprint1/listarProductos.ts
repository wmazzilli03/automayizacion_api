import { Given, Then, When } from "@cucumber/cucumber";
import { expect,APIResponse  } from '@playwright/test';
import ServicioListarProductos from "../../endpoint/servicioGetListar/ServicioListarProductos";

const servicioListarProductos = new ServicioListarProductos();
let respuestaApi: APIResponse;

//# .........................................................SCENARIO 1 ✅.................................................#

Given(`El servicio de listar productos esta disponible`, () => {
console.log("✅ El servicio de listar productos esta disponible");
});

When(`Se realiza la peticion para listar los productos`, async() => {
 respuestaApi = await servicioListarProductos.listarProductos();
});

Then(`Se debera obtener una respuesta exitosa con el listado de productos con status code {string}`, async (estadoRespuesta: string) => {
    const body = await respuestaApi.json();
    console.log("✅ Status:", respuestaApi.status(),'\n');
    console.log("✅ Response:", JSON.stringify(body, null, 2),'\n');
    expect(respuestaApi.status()).toBe(parseInt(estadoRespuesta));
});