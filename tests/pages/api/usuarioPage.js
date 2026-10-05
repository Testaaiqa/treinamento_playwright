import { expect } from '@playwright/test';
import { CadastroPage } from '../frontend/cadastroPage.js';
import { UsuarioApi } from './usuarioRequests.js';

export class UsuarioPayloadPage {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(page, request) {
        this.page = page;
        this.request = request;
        this.usuario = null;
        this.payload = null;
        this.response = null;
        this.body = null;
    }

    async montarPayLoadUsuario() {
        const cadastroPage = new CadastroPage();

        this.usuario = await cadastroPage.criarUsuario();

        expect(this.usuario.nome).toBeTruthy();
        expect(this.usuario.email).toBeTruthy();
        expect(this.usuario.senha).toBeTruthy();

        this.payload = {
            name: this.usuario.nome,
            email: this.usuario.email,
            password: this.usuario.senha
        };

        console.log('Usuário gerado:', this.payload);

        return this.payload;
    }

    async envioPayLoadUsuario() {
        const usuarioApi = new UsuarioApi(this.request);

        this.response = await usuarioApi.criarUsuarioApi(
            this.payload
        );

        this.body = await this.response.json();

        console.log('Status da criação:', this.response.status());
        console.log('Resposta da criação:', this.body);

        return {
            response: this.response,
            body: this.body
        };
    }

    async validarUsuarioCriado() {
        
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
    }

    async autenticarUsuarioCriado() {
        const usuarioApi = new UsuarioApi(this.request);

        const credenciais = {
            email: this.usuario.email,
            password: this.usuario.senha
        };

        this.response = await usuarioApi.autenticarUsuario(credenciais);

        this.body = await this.response.json();
        console.log('Resposta da autenticação:', this.body);
    }

    async tokenArmazenado() {
        expect(this.response.ok()).toBeTruthy();
        expect(this.response.status()).toBe(200);

        this.token = this.body.access_token 

        expect(this.token).toBeTruthy();
        expect(typeof this.token).toBe('string');

        console.log('Token armazenado com sucesso:', this.token);
    }

    async buscarTodosUsuarios() {
        const usuarioApi = new UsuarioApi(this.request);
        this.response = await usuarioApi.listarTodosUsuarios(this.token);

        this.body = await this.response.json();

        console.log('Resposta do GET all:', this.body);
    }

    async validarListagemUsuarios() {
        expect(this.response.ok()).toBeTruthy();
        expect(this.response.status()).toBe(200);

        this.listaUsuarios = Array.isArray(this.body) ? this.body : [];
        expect(Array.isArray(this.listaUsuarios)).toBeTruthy();
        expect(this.listaUsuarios.length).toBeGreaterThan(0);
    }

    async validarUsuarioNaListagem() {
        const usuarioEncontrado = this.listaUsuarios.find((usuario) => String(usuario.id) === String(this.usuarioId));

        expect(usuarioEncontrado).toBeTruthy();
        expect(usuarioEncontrado.name).toBe(this.usuario.nome);
        expect(usuarioEncontrado.email).toBe(this.usuario.email);
    }

    async buscarUsuarioPorId() {
        const usuarioApi = new UsuarioApi(this.request);
        
        this.response = await usuarioApi.buscarUsuarioPorId(
            this.usuarioId,
            this.token
        );
        
        this.body = await this.response.json();
        
        console.log('Resposta do GET por ID:', this.body);
    }

    async validarUsuarioPorId() {
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

    async prepararUsuario(autenticar = true) {

        await this.montarPayLoadUsuario();

        await this.envioPayLoadUsuario();

        await this.validarUsuarioCriado();

        if (autenticar) {
            await this.autenticarUsuarioCriado();
            await this.tokenArmazenado();
        }
    }
}