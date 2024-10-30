import { PrismaService } from "@/database/prisma.service";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const userControllerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type UserControllerBody = z.infer<typeof userControllerBodySchema>;

@Controller()
export class SignUpController {
  constructor(private prisma: PrismaService) {}
  @ApiTags("Auth")
  @ApiOperation({ summary: "Register a new user" })
  @Post("/sign-up")
  @HttpCode(200)
  @ZodSchemaPipe({
    body: userControllerBodySchema,
  })
  async handle(@Body() input: UserControllerBody): Promise<void> {
    const { email, name, password } = input;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) throw new ConflictException("Email already in use.");

    const hashedPassword = await hash(password, 10);

    try {
      await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to create user.");
    }
  }
}
