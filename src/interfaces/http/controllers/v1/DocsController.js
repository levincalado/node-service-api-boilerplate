const SwaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

module.exports = [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument, options)];
