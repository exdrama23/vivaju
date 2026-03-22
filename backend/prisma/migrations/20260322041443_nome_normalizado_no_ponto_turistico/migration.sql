/*
  Warnings:

  - Added the required column `nome_normalizado` to the `ponto_turistico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ponto_turistico" ADD COLUMN     "nome_normalizado" VARCHAR(200) NOT NULL;
