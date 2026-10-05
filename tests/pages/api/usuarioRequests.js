

export class UsuarioApi {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(request) {
        this.request = request;

        /*
        * Ajuste somente estes endpoints caso o Swagger
        * utilize caminhos diferentes.
        */
        this.endpoints = {
            criarUsuario: '/users',
            autenticar: '/auth/login',
            listarUsuarios: '/users',
            buscarUsuarioPorId: (id) => `/users/${id}`
        };
    }

    async criarUsuarioApi(payloadRecebido) {
        const payload = JSON.stringify(payloadRecebido);
        console.log('Payload enviado para criação:', payload)
        return await this.request.post(this.endpoints.criarUsuario, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: payload
        });
    }

    async autenticarUsuario(credenciais) {
        const credenciaisJson = JSON.stringify(credenciais);
        console.log(credenciaisJson)
        return await this.request.post(this.endpoints.autenticar, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: credenciaisJson
        });
    }

    async listarTodosUsuarios(token) {
        return await this.request.get(this.endpoints.listarUsuarios, {
            headers: this.criarHeadersAutenticados(token)
        });
    }

    async buscarUsuarioPorId(id, token) {
        return await this.request.get(
        this.endpoints.buscarUsuarioPorId(id),
        {
            headers: this.criarHeadersAutenticados(token)
        }
        );
    }

    criarHeadersAutenticados(token) {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

}