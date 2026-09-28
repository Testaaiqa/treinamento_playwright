import { Given, When, Then } from '@cucumber/cucumber';
import { UtilsPage } from '../../pages/utilsPage.js';
import { CadastroPage } from '../../pages/frontend/cadastroPage.js';


Given('acesso o formulário de cadastro de novo usuário', async function () {
    const utilsPage = new UtilsPage(this.page);

    await utilsPage.clicarBotao('Cadastro');
});

When('preencho os campos obrigatórios do formulário', async function () {
    const cadastroPage = new CadastroPage(this.page);
    this.usuario = await cadastroPage.criarUsuario();

    await cadastroPage.preencherFormularioCadastro(this.usuario);
});

When('confirmo a criação do usuário', async function () {
    const cadastroPage = new CadastroPage(this.page);

    await cadastroPage.confirmarCriacaoUsuario(this.usuario.nome, this.usuario.sobrenome);
});
