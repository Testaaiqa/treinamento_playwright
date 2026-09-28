import { expect } from '@playwright/test';
import { loginElements } from '../../elements/login.elements.js';

export class LoginPage {
    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */

    constructor(page) {
        this.page = page;
        this.LoginElements = new loginElements(page);
    }

    async acessarPortal() {
        await this.page.goto(process.env.BASE_URL);
    }

    async validarTitulo() {
        const titulo = await this.page.title();
        expect(titulo).toBe('Testa aí QA - Plataforma de Teste');
    }

    async preencherFormulario(email, senha) {
        // Mantém a lógica original: só preenche se tiver conteúdo
        // Isso permite testar cenários com login vazio
        
        if (email && email.length) {
            
            await this.LoginElements.inputEmail.fill(email);
        }
        
        if (senha && senha.length) {
            
            await this.LoginElements.inputSenha.fill(senha);
        }
    }
}