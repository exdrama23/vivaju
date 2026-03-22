/*
  Warnings:

  - Added the required column `descricao` to the `loja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_normalizado` to the `loja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loja" ADD COLUMN     "descricao" VARCHAR(3000) NOT NULL,
ADD COLUMN     "nome_normalizado" VARCHAR(150) NOT NULL;
