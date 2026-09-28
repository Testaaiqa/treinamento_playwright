export class cadastroElements {

    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */
    
    constructor(page) {

        this.input_nome = page.getByPlaceholder('Seu nome');
        this.input_sobreNome = page.getByPlaceholder('Seu sobrenome');
        this.input_cpf = page.getByLabel('CPF');
        this.input_data_de_nascimento = page.getByLabel('Data de nascimento');
        this.input_telefone = page.getByLabel('Telefone');
        this.radio_forma_de_tratamento = page.getByTestId('call-as-mr-radio');
        this.input_cep = page.getByLabel('CEP');
        this.input_rua = page.getByLabel('Rua');
        this.input_numero = page.getByLabel('Número');
        this.input_complemento = page.getByLabel('Complemento');
        this.input_bairro = page.getByLabel('Bairro');
        this.input_cidade = page.getByLabel('Cidade');
        this.select_estados = page.getByTestId('state-select');
        this.check_box_aceito_termos = page.getByTestId('accept-terms-checkbox');
        this.input_email = page.getByTestId('email-input');
        this.input_senha = page.getByLabel('Senha');
    }
}