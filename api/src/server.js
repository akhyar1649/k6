const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const routes = require("./routes.js");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: '0.0.0.0',
  });

  await server.register(Inert);
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
