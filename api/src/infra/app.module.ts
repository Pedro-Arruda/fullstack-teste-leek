import { PrismaService } from "@/database/prisma.service";
import { Module } from "@nestjs/common";
import { HttpModule } from "./http/http.module";

@Module({
  imports: [HttpModule],
  providers: [PrismaService],
})
export class AppModule {}
