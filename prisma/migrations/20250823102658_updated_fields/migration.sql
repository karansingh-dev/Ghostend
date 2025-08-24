/*
  Warnings:

  - You are about to drop the column `response_time_ms` on the `api_calls` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `api_calls` table. All the data in the column will be lost.
  - You are about to drop the column `response_config` on the `ghost_apis` table. All the data in the column will be lost.
  - Added the required column `api_method` to the `ghost_apis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default_count` to the `ghost_apis` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ApiMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

-- AlterTable
ALTER TABLE "public"."api_calls" DROP COLUMN "response_time_ms",
DROP COLUMN "user_agent";

-- AlterTable
ALTER TABLE "public"."ghost_apis" DROP COLUMN "response_config",
ADD COLUMN     "api_method" "public"."ApiMethod" NOT NULL,
ADD COLUMN     "default_count" INTEGER NOT NULL;
