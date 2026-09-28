#language: pt

@api 
Funcionalidade: Gerenciamento de usuários pela API

  Cenario: Criar, autenticar e consultar um usuário
    Dado que possuo os dados dinâmicos de um novo usuário
    E envio uma requisição para criar o usuário
    Então o usuário deve ser criado com sucesso
    E autentico com o usuário criado
    Então devo receber um token de autenticação
    E consulto todos os usuários autenticado
    Então a listagem de usuários deve ser retornada com sucesso
    E o usuário criado deve estar presente na listagem
    E consulto o usuário criado pelo ID
    Então os dados do usuário devem ser retornados corretamente