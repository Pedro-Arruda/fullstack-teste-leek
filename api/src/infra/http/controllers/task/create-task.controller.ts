import { JwtAuthGuard } from "@/core/jwt-guard";
import { PrismaService } from "@/database/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

type dbStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

const taskControllerBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["pendente", "em_progresso", "concluida"]),
  finishedAt: z.string().datetime().optional(),
});

type TaskControllerBody = z.infer<typeof taskControllerBodySchema>;

@Controller()
export class CreateTaskController {
  constructor(private prisma: PrismaService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags("Task")
  @ApiOperation({ summary: "Register a new task" })
  @Post("/task")
  @HttpCode(201)
  @ZodSchemaPipe({
    body: taskControllerBodySchema,
  })
  async handle(
    @Body() input: TaskControllerBody,
    @Request() req: FastifyRequest,
  ): Promise<void> {
    const { description, status, title, finishedAt } = input;
    const user = req.user;

    const dbStatus = status.toUpperCase() as dbStatus;

    try {
      await this.prisma.task.create({
        data: {
          title,
          description,
          status: dbStatus,
          finishedAt: finishedAt ? new Date(finishedAt) : undefined,
          userId: user.userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to create task.");
    }
  }
}
