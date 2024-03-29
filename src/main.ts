import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { NotFoundExceptionFilter } from "./not-found-exception.filter";
import { cors, multipart, session } from "./utils/middlewares";
import "./utils/sentry";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  cors(app);
  multipart(app);
  session(app);

  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(process.env.PORT || 5000, "0.0.0.0");
}

bootstrap();
