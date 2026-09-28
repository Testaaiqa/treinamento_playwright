import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/frontend/loginPage.js';
import { UtilsPage } from '../../pages/utilsPage.js';

Given('que acesso a Plataforma Testa aí QA', async function () {
    const loginPage = new LoginPage(this.page)

    await loginPage.acessarPortal()
    await loginPage.validarTitulo()
});

When('preencho os campos de email e senha', async function() {
    const loginPage = new LoginPage(this.page)
    
    await loginPage.preencherFormulario(process.env.USER_EMAIL, process.env.USER_PASSWORD)
});

When('clico no botão Login', async function() {
    const utilsPage = new UtilsPage(this.page)

    await utilsPage.clicarBotao('Entrar')
});

Then('vejo a página de boas vindas', async function() {
    const utilsPage = new UtilsPage(this.page)
    
    await utilsPage.validarTexto('Bem-vindo ao Testa aí QA')
});