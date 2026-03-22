/*
  Warnings:

  - A unique constraint covering the columns `[loja_id]` on the table `loja_estacionamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loja_id]` on the table `loja_funcionamento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "loja_estacionamento_loja_id_key" ON "loja_estacionamento"("loja_id");

-- CreateIndex
CREATE UNIQUE INDEX "loja_funcionamento_loja_id_key" ON "loja_funcionamento"("loja_id");
