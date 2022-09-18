import { tests } from "@prisma/client";

export type CreateTestData = Omit<tests, "id" >;