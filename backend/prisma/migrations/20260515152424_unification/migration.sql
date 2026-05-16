/*
  Warnings:

  - Added the required column `latitude` to the `loja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `loja` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "produto_nome_key";

-- AlterTable
ALTER TABLE "loja" ADD COLUMN     "imagem" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "descricao" VARCHAR(1000),
ADD COLUMN     "imagem" TEXT;
