import { PrismaService } from "@/database/prisma.service";
import { Module } from "@nestjs/common";
import { SignInController } from "./controllers/auth/sign-in.controller";
import { SignUpController } from "./controllers/auth/sign-up.controller";

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [SignUpController, SignInController],
})
export class HttpModule {}
