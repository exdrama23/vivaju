/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `categoria` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "data_criacao",
ADD COLUMN     "data_creacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "chat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cliente_id" UUID NOT NULL,
    "loja_id" UUID NOT NULL,
    "bloqueado" BOOLEAN NOT NULL DEFAULT false,
    "bloqueador_tipo" VARCHAR(20),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabler_tipo" VARCHAR(20),
    "disabled_at" TIMESTAMPTZ(6),
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atual_izacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chat_id" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "enviado_por" VARCHAR(20) NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_cliente_id_loja_id_key" ON "chat"("cliente_id", "loja_id");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
