import { PrismaService } from "@/database/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../../env";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const JWT_SECRET = env.JWT_SECRET;

const userControllerResponseSchema = z.object({
  token: z.string(),
});

const UserControllerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type UserControllerResponse = z.infer<typeof userControllerResponseSchema>;

type UserControllerBody = z.infer<typeof UserControllerBodySchema>;

@Controller()
export class SignInController {
  constructor(private prisma: PrismaService) {}
  @ApiTags("Auth")
  @ApiOperation({ summary: "Login with an already existing user" })
  @Post("/sign-in")
  @HttpCode(201)
  @ZodSchemaPipe({
    body: UserControllerBodySchema,
    response: userControllerResponseSchema,
  })
  async handle(
    @Body() input: UserControllerBody,
  ): Promise<UserControllerResponse> {
    const { email, password } = input;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new UnauthorizedException("Invalid email or password.");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { token };
  }
}
