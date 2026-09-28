import { utilElements } from '../elements/utils.elements.js';
import { cadastroElements } from '../elements/cadastro.elements.js';
import { expect } from '@playwright/test';


export class UtilsPage {
    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */

    constructor(page) {
        this.page = page;
        this.UtilsElements = new utilElements(page);
        this.CadastroElements = new cadastroElements(page);
    }

    async clicarBotao(nomeBotao) {
        
        await this.UtilsElements.botao(nomeBotao).click();
    }

    async validarTexto(nomeTexto) {
        await expect(this.page.getByText(nomeTexto)).toBeVisible({ timeout: 30000 });
    }  

}