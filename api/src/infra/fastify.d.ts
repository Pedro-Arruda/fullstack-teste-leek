// src/fastify.d.ts
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      userId: string;
    };
  }
}
