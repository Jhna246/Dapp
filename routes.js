const routes = require('next-routes')();

routes.add('/campaigns/create', '/campaigns/create');

routes.add('/campaigns/:address', '/campaigns/details');

routes.add('/campaigns/:address/request', '/campaigns/request/index');

routes.add('/campaigns/:address/request/create', '/campaigns/request/create');

module.exports = routes;
