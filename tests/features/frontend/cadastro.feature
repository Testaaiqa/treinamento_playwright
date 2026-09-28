#language: pt

@ui  @cadastro
Funcionalidade: Cadastro de novo usuário na Plataforma de Teste

  Cenario: Cadastro de novo usuário com sucesso
    Dado que acesso a Plataforma Testa aí QA
    E acesso o formulário de cadastro de novo usuário
    Quando preencho os campos obrigatórios do formulário 
    E confirmo a criação do usuário
    Então vejo a página de boas vindas