import { PrismaService } from "@/database/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

type dbStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

const taskControllerParamSchema = z.object({
  id: z.string(),
});

const taskControllerBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["pendente", "em_progresso", "concluida"]),
  finishedAt: z.string().datetime().optional(),
});

type TaskControllerBody = z.infer<typeof taskControllerBodySchema>;
type TaskControllerParam = z.infer<typeof taskControllerParamSchema>;

@Controller()
export class UpdateTaskController {
  constructor(private prisma: PrismaService) {}
  @ApiTags("Task")
  @ApiOperation({ summary: "Update a already existing task" })
  @Patch("/task/:id")
  @HttpCode(201)
  @ZodSchemaPipe({
    body: taskControllerBodySchema,
    routeParams: taskControllerParamSchema,
  })
  async handle(
    @Body() input: TaskControllerBody,
    @Param() param: TaskControllerParam,
  ): Promise<void> {
    const { id } = param;
    const { description, status, title, finishedAt } = input;

    const dbStatus = status.toUpperCase() as dbStatus;

    try {
      await this.prisma.task.update({
        data: {
          title,
          description,
          status: dbStatus,
          finishedAt,
        },
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to update task.");
    }
  }
}
