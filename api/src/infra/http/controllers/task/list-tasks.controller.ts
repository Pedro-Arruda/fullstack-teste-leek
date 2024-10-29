import { JwtAuthGuard } from "@/core/jwt-guard";
import { PrismaService } from "@/database/prisma.service";
import {
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const taskControllerResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDENTE", "EM_PROGRESSO", "CONCLUIDA"]),
  createdAt: z.date().nullable(),
  finishedAt: z.date().nullable(),
});

type TaskControllerResponse = z.infer<typeof taskControllerResponseSchema>;

@Controller()
export class ListTasksController {
  constructor(private prisma: PrismaService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags("Task")
  @ApiOperation({ summary: "List all the tasks related to the user" })
  @Get("/task")
  @HttpCode(200)
  @ZodSchemaPipe({
    response: z.array(taskControllerResponseSchema),
  })
  async handle(
    @Request() req: FastifyRequest,
  ): Promise<TaskControllerResponse[]> {
    try {
      const user = req.user;

      const tasks = await this.prisma.task.findMany({
        where: { userId: user.userId },
      });

      return tasks;
    } catch (error) {
      throw new InternalServerErrorException("Failed to list tasks.");
    }
  }
}
