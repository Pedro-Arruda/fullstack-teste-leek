import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import packageJson from "package.json";
import { AppModule } from "./app.module";
import { env } from "./env";

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: "*",
      },
    },
  );

  const swaggerDocumentConfig = new DocumentBuilder()
    .setTitle(env.API_NAME)
    .setDescription("")
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentConfig,
  );
  const swaggerPath = "docs";

  SwaggerModule.setup(swaggerPath, app, swaggerDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(env.API_PORT, "0.0.0.0");

  console.log(`Application "${env.API_NAME}" is running!`);

  console.log(`http://localhost:${env.API_PORT}/${swaggerPath}`);
})();
