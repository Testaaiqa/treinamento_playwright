export class utilElements {

    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */
    
    constructor(page) {
        this.page = page
    }

    botao(nomeBotao) {
        return this.page.getByRole('button', {
            name: nomeBotao
        })
    }

}