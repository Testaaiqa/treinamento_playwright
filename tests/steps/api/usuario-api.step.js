import { Given, When, Then } from '@cucumber/cucumber';

import { expect } from '@playwright/test';
import { CadastroPage } from '../../pages/frontend/cadastroPage.js';
import { UsuarioApi } from '../../pages/api/usuarioApi.js';

Given('que possuo os dados dinâmicos de um novo usuário', async function () {
    const cadastroPage = new CadastroPage();
    this.usuario = await cadastroPage.criarUsuario();

    expect(this.usuario.nome).toBeTruthy();
    expect(this.usuario.email).toBeTruthy();
    expect(this.usuario.senha).toBeTruthy();

    console.log('Usuário gerado:', {
        name: this.usuario.nome,
        email: this.usuario.email,
        password: this.usuario.senha
    });
});


When('envio uma requisição para criar o usuário', async function () {
    const usuarioApi = new UsuarioApi(this.request);

    this.response = await usuarioApi.criarUsuarioApi(this.usuario.nome, this.usuario.email, this.usuario.senha);

    this.body = await this.response.json();

    console.log('Resposta da criação:', this.body);
});

Then('o usuário deve ser criado com sucesso', async function () {

    // Valida se a requisição foi realizada com sucesso
    expect(this.response.ok()).toBeTruthy();

    // Valida o status da requisição
    expect([200, 201]).toContain(this.response.status());

    // Guarda o ID do usuário criado
    this.usuarioId = this.body.id;

    expect(this.usuarioId).toBeTruthy();

    // Valida os dados retornados
    expect(this.body.name).toBe(this.usuario.nome);
    expect(this.body.email).toBe(this.usuario.email);

    console.log('ID armazenado:', this.usuarioId);
});

When('autentico com o usuário criado', async function () {
    const usuarioApi = new UsuarioApi(this.request);

    const credenciais = {
        email: this.usuario.email,
        password: this.usuario.senha
    };

    this.response = await usuarioApi.autenticarUsuario(credenciais);

    this.body = await this.response.json();
    console.log('Resposta da autenticação:', this.body);
});

Then('devo receber um token de autenticação', async function () {
    expect(this.response.ok()).toBeTruthy();
    expect(this.response.status()).toBe(200);

    this.token = this.body.access_token ??

    expect(this.token).toBeTruthy();
    expect(typeof this.token).toBe('string');

    console.log('Token armazenado com sucesso');
});


When('consulto todos os usuários autenticado', async function () {
        const usuarioApi = new UsuarioApi(this.request);
        this.response = await usuarioApi.listarTodosUsuarios(this.token);

        this.body = await this.response.json();

        console.log('Resposta do GET all:', this.body);
    }
);

Then('a listagem de usuários deve ser retornada com sucesso', async function () {
    expect(this.response.ok()).toBeTruthy();
    expect(this.response.status()).toBe(200);

    this.listaUsuarios = Array.isArray(this.body) ? this.body : [];
    expect(Array.isArray(this.listaUsuarios)).toBeTruthy();
});

Then('o usuário criado deve estar presente na listagem', async function () {
    const usuarioEncontrado = this.listaUsuarios.find((usuario) => String(usuario.id) === String(this.usuarioId));

    expect(usuarioEncontrado).toBeTruthy();
    expect(usuarioEncontrado.name).toBe(this.usuario.nome);
    expect(usuarioEncontrado.email).toBe(this.usuario.email);
});


When('consulto o usuário criado pelo ID', async function () {
    const usuarioApi = new UsuarioApi(this.request);

    this.response = await usuarioApi.buscarUsuarioPorId(
        this.usuarioId,
        this.token
    );

    this.body = await this.response.json();

    console.log('Resposta do GET por ID:', this.body);
});


Then('os dados do usuário devem ser retornados corretamente', async function () {
    expect(this.response.ok()).toBeTruthy();
    expect(this.response.status()).toBe(200);

    const usuarioRetornado = this.body;

        expect(String(usuarioRetornado.id)).toBe(String(this.usuarioId));

        expect(usuarioRetornado.name).toBe(this.usuario.nome);

        expect(usuarioRetornado.email).toBe(this.usuario.email);

        /*
         * Garante que a senha não está sendo retornada
         * pela API.
         */
        expect(usuarioRetornado.password).toBeUndefined();
    }
);