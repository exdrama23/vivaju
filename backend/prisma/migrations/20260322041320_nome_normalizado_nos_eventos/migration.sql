/*
  Warnings:

  - Added the required column `nome_normalizado` to the `evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evento" ADD COLUMN     "nome_normalizado" VARCHAR(150) NOT NULL;
