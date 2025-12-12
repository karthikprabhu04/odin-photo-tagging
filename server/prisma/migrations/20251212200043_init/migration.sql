-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "tolerance" DOUBLE PRECISION NOT NULL DEFAULT 5.0,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
