import { Given, Then, When } from "@cucumber/cucumber";
import { expect,APIResponse  } from '@playwright/test';
import ServicioCrearUsuario_request from "../../endpoint/servicioPostUser/ServicioCrearUsuario_request";
import { servicioCrearUsuario_body } from "../../endpoint/servicioPostUser/ServicioCrearUsuario_body";

const servicioRequest = new ServicioCrearUsuario_request();
const servicioBody = new servicioCrearUsuario_body();
let respuestaApi: APIResponse;


Given(`El servicio de crear usuario esta disponible`, () => {
console.log("✅ El servicio de crear usuario esta disponible",'\n');
servicioBody.reset();
});

When(`Se realiza la peticion para crear un nuevo usuario con los datos requeridos`, async() => {
    servicioBody.actualizarPayload("email", "wmazzilli@example.com");
    respuestaApi = await servicioRequest.crearUsuario(servicioBody.toJsonBody());

});

Then(`Se debera obtener una respuesta exitosa con la confirmacion de la creacion del usuario con status code {string}`, async (statusCode: string) => {
    const body = await respuestaApi.json();
    console.log("✅ Status:", respuestaApi.status(),'\n');
    console.log("✅ Payload:", servicioBody.toJsonBody(),'\n'); 
    console.log("✅ Response:", JSON.stringify(body, null, 2),'\n');
    expect(respuestaApi.status()).toBe(parseInt(statusCode));
});