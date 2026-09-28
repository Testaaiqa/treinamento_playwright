import { expect } from '@playwright/test';
import { cadastroElements } from '../../elements/cadastro.elements.js';
import { UtilsPage } from '../utilsPage.js';
import { fakerPT_BR as faker } from '@faker-js/faker';


export class CadastroPage {
    /** @type {import('@playwright/test').Page} */
    
    page;
    
    /**
    
    * @param {import('@playwright/test').Page} page
    
    */

    constructor(page) {
        this.page = page;

        if (page) {
            this.CadastroElements = new cadastroElements(page);
            this.utilsPage = new UtilsPage(page);
        }
    }

    async criarUsuario() {
        const nome = faker.person.firstName()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .toLowerCase();

        const randomico = faker.string.numeric(5);

        return {
            nome,
            sobrenome: faker.person.lastName(),
            cpf: faker.string.numeric(11),
            dataNascimento: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
            telefone: faker.string.numeric(11),
            cep: faker.location.zipCode('#####-###'),
            rua: faker.location.street(),
            numero: faker.string.numeric(3),
            complemento: faker.location.secondaryAddress(),
            bairro: faker.location.city(),
            cidade: faker.location.city(),
            email: `${nome}${randomico}@test.com`,
            senha: faker.internet.password({ length: 8, pattern: /[A-Za-z0-9]/ })
        };
    }

    async radioGenero(valor) {
        return this.page.locator(
            `input[name="gender"][value="${valor}"]`
        );
    }

    async selecionarGeneroAleatorio() {
        const genero = faker.helpers.arrayElement([
            'feminino',
            'masculino',
            'outro'
        ]);
        
        const radioGenero = await this.radioGenero(genero);
        
            await radioGenero.check();
            await expect(
                radioGenero,
                `O gênero "${genero}" deveria estar selecionado`
            ).toBeChecked();
        
        return genero;
    }

    async selecionarEstadoAleatorio() {

        const estadosEsperados = [
            'Acre',
            'Alagoas',
            'Amapá',
            'Amazonas',
            'Bahia',
            'Ceará',
            'Distrito Federal',
            'Espírito Santo',
            'Goiás',
            'Maranhão',
            'Mato Grosso',
            'Mato Grosso do Sul',
            'Minas Gerais',
            'Pará',
            'Paraíba',
            'Paraná',
            'Pernambuco',
            'Piauí',
            'Rio de Janeiro',
            'Rio Grande do Norte',
            'Rio Grande do Sul',
            'Rondônia',
            'Roraima',
            'Santa Catarina',
            'São Paulo',
            'Sergipe',
            'Tocantins'
        ];

        const select = this.CadastroElements.select_estados;

        const estadosTela = (
            await select.locator('option').allTextContents()
        ).filter(
            estado => estado.trim() !== 'Selecione o estado'
        );

        // Valida quantidade
        expect(estadosTela.length).toBe(27);

        // Valida lista completa
        expect(estadosTela).toEqual(estadosEsperados);

        // Sorteia um estado
        const estadoSelecionado =
            estadosTela[Math.floor(Math.random() * estadosTela.length)];

        // Seleciona o estado
        await select.selectOption({
            label: estadoSelecionado
        });

        // Valida o estado selecionado
        await expect(
            select.locator('option:checked')
        ).toHaveText(estadoSelecionado);

        return estadoSelecionado;
    }

    async preencherFormularioCadastro(usuario) {
        await this.CadastroElements.input_nome.fill(usuario.nome);
        await this.CadastroElements.input_sobreNome.fill(usuario.sobrenome);
        await this.CadastroElements.input_cpf.fill(usuario.cpf);
        await this.CadastroElements.input_data_de_nascimento.fill(usuario.dataNascimento);
        await this.CadastroElements.input_telefone.fill(usuario.telefone);
        await this.selecionarGeneroAleatorio();
        await this.CadastroElements.radio_forma_de_tratamento.check();  
        await this.CadastroElements.input_cep.fill(usuario.cep);
        await this.CadastroElements.input_rua.fill(usuario.rua);
        await this.CadastroElements.input_numero.fill(usuario.numero);  
        await this.CadastroElements.input_complemento.fill(usuario.complemento);
        await this.CadastroElements.input_bairro.fill(usuario.bairro);
        await this.CadastroElements.input_cidade.fill(usuario.cidade);
        await this.selecionarEstadoAleatorio();
        await this.CadastroElements.check_box_aceito_termos.check();
        await this.CadastroElements.input_email.fill(usuario.email);
        await this.CadastroElements.input_senha.fill(usuario.senha);
        await this.utilsPage.clicarBotao('Criar usuário');
    }

    async confirmarCriacaoUsuario(nome, sobreNome) {
        await this.utilsPage.validarTexto(`Usuário ${nome} ${sobreNome} criado com sucesso no banco Neon.`);
        await this.utilsPage.clicarBotao('Entendi');
    }
}