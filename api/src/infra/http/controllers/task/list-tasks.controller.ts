import { PrismaService } from "@/database/prisma.service";
import {
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @ApiTags("Task")
  @ApiOperation({ summary: "List all the tasks" })
  @Get("/task")
  @HttpCode(200)
  @ZodSchemaPipe({
    response: z.array(taskControllerResponseSchema),
  })
  async handle(): Promise<TaskControllerResponse[]> {
    try {
      const tasks = await this.prisma.task.findMany();

      return tasks;
    } catch (error) {
      throw new InternalServerErrorException("Failed to list tasks.");
    }
  }
}
