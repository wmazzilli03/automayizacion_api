@api
Feature: listar productos

  @listarProductos
  Scenario: Listar Productos
    Given El servicio de listar productos esta disponible
    When Se realiza la peticion para listar los productos
    Then Se debera obtener una respuesta exitosa con el listado de productos con status code "200"