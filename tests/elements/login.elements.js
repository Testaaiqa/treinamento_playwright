export class loginElements {

    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */
    
    constructor(page) {

        this.inputEmail = page.getByTestId('email-input');
        this.inputSenha = page.getByTestId('password-input');
    }
}