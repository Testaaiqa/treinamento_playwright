# language: pt

@api
Funcionalidade: Gerenciamento de usuários pela API

  @criarUsuario
  Cenário: Criar um novo usuário com sucesso
    Dado que possuo os dados dinâmicos de um novo usuário
    Quando envio uma requisição para criar o usuário
    Então o usuário deve ser criado com sucesso


  @autenticarUsuario
  Cenário: Autenticar com um usuário existente
    Dado que possuo um usuário cadastrado
    Quando autentico com as credenciais do usuário
    Então devo receber um token de autenticação válido


  @listarUsuarios
  Cenário: Listar todos os usuários autenticado
    Dado que possuo um usuário preparado
    Quando consulto todos os usuários autenticados
    Então a listagem de usuários deve ser retornada com sucesso
    E o usuário criado deve estar presente na listagem


  @buscarUsuario
  Cenário: Consultar um usuário pelo ID
    Dado que possuo um usuário preparado
    Quando consulto o usuário pelo ID
    Então os dados do usuário devem ser retornados corretamente