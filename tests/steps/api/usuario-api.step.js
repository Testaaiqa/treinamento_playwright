import { Given, When, Then } from '@cucumber/cucumber';
import { UsuarioPayloadPage } from '../../pages/api/usuarioPage.js';

Given('que possuo os dados dinâmicos de um novo usuário', async function () {
    this.usuarioPayloadPage = new UsuarioPayloadPage(
        this.page,
        this.request
    );
    await this.usuarioPayloadPage.montarPayLoadUsuario();
});

When('envio uma requisição para criar o usuário', async function () {
    await this.usuarioPayloadPage.envioPayLoadUsuario();
});

Then('o usuário deve ser criado com sucesso', async function () {
    await this.usuarioPayloadPage.validarUsuarioCriado();
});

Given('que possuo um usuário cadastrado', async function () {
    this.usuarioPayloadPage = new UsuarioPayloadPage(
        this.page,
        this.request
    );
    await this.usuarioPayloadPage.prepararUsuario(false);
});

When('autentico com as credenciais do usuário', async function () {
    await this.usuarioPayloadPage.autenticarUsuarioCriado();
});

Then('devo receber um token de autenticação válido', async function () {
    await this.usuarioPayloadPage.tokenArmazenado();
});

Given('que possuo um usuário preparado', async function () {
    this.usuarioPayloadPage = new UsuarioPayloadPage(
        this.page,
        this.request
    );

    await this.usuarioPayloadPage.prepararUsuario();
});

When('consulto todos os usuários autenticados', async function () {
    await this.usuarioPayloadPage.buscarTodosUsuarios();
});

Then('a listagem de usuários deve ser retornada com sucesso', async function () {
    await this.usuarioPayloadPage.validarListagemUsuarios();
});

Then('o usuário criado deve estar presente na listagem', async function () {
    await this.usuarioPayloadPage.validarUsuarioNaListagem();
});

When('consulto o usuário pelo ID', async function () {
    await this.usuarioPayloadPage.buscarUsuarioPorId();
});

Then('os dados do usuário devem ser retornados corretamente', async function () {
    await this.usuarioPayloadPage.validarUsuarioPorId();
});