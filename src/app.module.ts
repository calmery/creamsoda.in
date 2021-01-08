import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChekiModule } from "./cheki/cheki.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [ConfigModule.forRoot(), ChekiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
