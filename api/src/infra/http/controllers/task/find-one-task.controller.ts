import { JwtAuthGuard } from "@/core/jwt-guard";
import { PrismaService } from "@/database/prisma.service";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const taskControllerParamSchema = z.object({
  id: z.string(),
});

const taskControllerResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDENTE", "EM_PROGRESSO", "CONCLUIDA"]),
  createdAt: z.date(),
  finishedAt: z.date().nullable(),
});

type dbStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

type TaskControllerResponse = z.infer<typeof taskControllerResponseSchema>;
type TaskControllerParam = z.infer<typeof taskControllerParamSchema>;

@Controller()
export class FindOneTaskController {
  constructor(private prisma: PrismaService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags("Task")
  @ApiOperation({ summary: "Find a unique task by id" })
  @Get("/task/:id")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: taskControllerParamSchema,
  })
  async handle(@Param() param: TaskControllerParam): Promise<any> {
    const { id } = param;

    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new NotFoundException("Task not found");

    const taskResponse: TaskControllerResponse = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status as dbStatus,
      createdAt: task.createdAt,
      finishedAt: task.finishedAt,
    };

    return taskResponse;
  }
}
