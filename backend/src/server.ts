import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import { env } from './infra/env';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes.js';
import { userController } from './modules/User/UserController.js';
import { productController } from './modules/Product/ProductController.js';
import { addressController } from './modules/Address/AddressController.js';
import { orderController } from './modules/Order/OrderController.js';
import { categoryController } from './modules/Category/CategoryController.js';

const app = fastify({logger: true}).withTypeProvider<ZodProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Mimo API',
            version: '1.0.0',
        },
    },
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(routes);
app.register(userController);
app.register(productController);
app.register(addressController);
app.register(orderController);
app.register(categoryController);

app.listen({ port: env.BACKEND_APP_PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${env.BACKEND_APP_PORT}`);
})