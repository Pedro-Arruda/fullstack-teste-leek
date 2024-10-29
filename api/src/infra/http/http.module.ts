import { PrismaService } from "@/database/prisma.service";
import { Module } from "@nestjs/common";
import { SignUpController } from "./controllers/auth/sign-up.controller";

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [SignUpController],
})
export class HttpModule {}
