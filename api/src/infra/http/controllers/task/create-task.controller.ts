import { PrismaService } from "@/database/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @ApiTags("Task")
  @ApiOperation({ summary: "Register a new task" })
  @Post("/task")
  @HttpCode(201)
  @ZodSchemaPipe({
    body: taskControllerBodySchema,
  })
  async handle(@Body() input: TaskControllerBody): Promise<void> {
    const { description, status, title, finishedAt } = input;

    const dbStatus = status.toUpperCase() as dbStatus;

    try {
      await this.prisma.task.create({
        data: {
          title,
          description,
          status: dbStatus,
          finishedAt: finishedAt ? new Date(finishedAt) : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to create task.");
    }
  }
}
