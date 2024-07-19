import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_SETTINGS } from './settings';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_SETTINGS.TITLE)
    .setDescription(SWAGGER_SETTINGS.DESCRIPTION)
    .setVersion(SWAGGER_SETTINGS.VERSION);

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup(SWAGGER_SETTINGS.PREFIX, app, document);
}
