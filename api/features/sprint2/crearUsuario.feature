@api
Feature: crear un usuario 

  @crearUsuario
  Scenario: Crear un nuevo usuario
    Given El servicio de crear usuario esta disponible
    When Se realiza la peticion para crear un nuevo usuario con los datos requeridos
    Then Se debera obtener una respuesta exitosa con la confirmacion de la creacion del usuario con status code "201"
