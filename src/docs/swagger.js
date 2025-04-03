const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestão de Consultas Médicas',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Paciente: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        data_nascimento: { type: 'string', format: 'date' },
                        cpf: { type: 'string' },
                        telefone: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        historico: { type: 'string' },
                        convenio: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
};
