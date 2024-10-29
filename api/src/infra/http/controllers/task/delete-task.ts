import { JwtAuthGuard } from "@/core/jwt-guard";
import { PrismaService } from "@/database/prisma.service";
import {
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
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

type TaskControllerResponse = z.infer<typeof taskControllerResponseSchema>;
type TaskControllerParam = z.infer<typeof taskControllerParamSchema>;

@Controller()
export class DeleteTaskController {
  constructor(private prisma: PrismaService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags("Task")
  @ApiOperation({ summary: "Delete a task" })
  @Delete("/task/:id")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: taskControllerParamSchema,
  })
  async handle(
    @Param() param: TaskControllerParam,
  ): Promise<TaskControllerResponse> {
    const { id } = param;

    try {
      const task = await this.prisma.task.delete({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException("Task not found");
      }

      return task;
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch task.");
    }
  }
}
