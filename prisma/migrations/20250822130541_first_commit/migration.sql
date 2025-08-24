-- CreateTable
CREATE TABLE "public"."ghost_apis" (
    "id" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "endpoint_name" TEXT NOT NULL,
    "json_template" JSONB NOT NULL,
    "response_config" JSONB DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ghost_apis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."api_keys" (
    "id" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "key_name" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."api_calls" (
    "id" TEXT NOT NULL,
    "ghost_api_id" TEXT NOT NULL,
    "api_key_id" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "response_time_ms" INTEGER,
    "called_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_calls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ghost_apis_clerk_user_id_endpoint_name_key" ON "public"."ghost_apis"("clerk_user_id", "endpoint_name");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_api_key_key" ON "public"."api_keys"("api_key");

-- AddForeignKey
ALTER TABLE "public"."api_calls" ADD CONSTRAINT "api_calls_ghost_api_id_fkey" FOREIGN KEY ("ghost_api_id") REFERENCES "public"."ghost_apis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."api_calls" ADD CONSTRAINT "api_calls_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
