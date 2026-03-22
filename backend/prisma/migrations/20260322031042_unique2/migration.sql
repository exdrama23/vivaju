/*
  Warnings:

  - A unique constraint covering the columns `[loja_id,categoria_id]` on the table `categoria_loja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoria_id,produto_id]` on the table `categoria_produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categoria_loja_loja_id_categoria_id_key" ON "categoria_loja"("loja_id", "categoria_id");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_produto_categoria_id_produto_id_key" ON "categoria_produto"("categoria_id", "produto_id");
