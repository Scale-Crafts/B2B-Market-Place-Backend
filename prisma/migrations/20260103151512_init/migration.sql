-- CreateTable
CREATE TABLE "vendors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "approved_at" TIMESTAMP(3),
    "location" geography(Point,4326),

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);
