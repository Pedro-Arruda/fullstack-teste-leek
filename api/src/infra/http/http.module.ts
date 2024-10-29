import { PrismaService } from "@/database/prisma.service";
import { Module } from "@nestjs/common";
import { SignInController } from "./controllers/auth/sign-in.controller";
import { SignUpController } from "./controllers/auth/sign-up.controller";
import { CreateTaskController } from "./controllers/task/create-task.controller";
import { DeleteTaskController } from "./controllers/task/delete-task";
import { FindOneTaskController } from "./controllers/task/find-one-task.controller";
import { ListTasksController } from "./controllers/task/list-tasks.controller";
import { UpdateTaskController } from "./controllers/task/update-task.controller";

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [
    SignUpController,
    SignInController,
    CreateTaskController,
    UpdateTaskController,
    ListTasksController,
    FindOneTaskController,
    DeleteTaskController,
  ],
})
export class HttpModule {}
