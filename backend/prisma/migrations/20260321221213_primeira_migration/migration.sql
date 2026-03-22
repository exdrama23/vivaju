-- CreateTable
CREATE TABLE "categoria" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(150) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_loja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "loja_id" UUID NOT NULL,
    "categoria_id" UUID NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_produto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoria_id" UUID NOT NULL,
    "produto_id" UUID NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(254) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(13),
    "nome" VARCHAR(150) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(150) NOT NULL,
    "descricao" VARCHAR(3000) NOT NULL,
    "inicio" TIMESTAMPTZ(6) NOT NULL,
    "fim" TIMESTAMPTZ(6) NOT NULL,
    "localizacao" VARCHAR(300) NOT NULL,
    "categoria" VARCHAR(30) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(254) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "vendedor_ambulante" BOOLEAN NOT NULL,
    "cep" VARCHAR(8),
    "logradouro" VARCHAR(100),
    "num_endereco" VARCHAR(20),
    "complemento" VARCHAR(300),
    "estacionamento" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loja_estacionamento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "loja_id" UUID NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "tempo_preco" VARCHAR(20) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "loja_estacionamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loja_funcionamento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "loja_id" UUID NOT NULL,
    "seg_abr" TIME(6),
    "seg_fec" TIME(6),
    "ter_abr" TIME(6),
    "ter_fec" TIME(6),
    "qua_abr" TIME(6),
    "qua_fec" TIME(6),
    "qui_abr" TIME(6),
    "qui_fec" TIME(6),
    "sex_abr" TIME(6),
    "sex_fec" TIME(6),
    "sab_abr" TIME(6),
    "sab_fec" TIME(6),
    "dom_abr" TIME(6),
    "dom_fec" TIME(6),
    "feriado_abr" TIME(6),
    "feriado_fec" TIME(6),
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "loja_funcionamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ponto_turistico" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(200) NOT NULL,
    "descricao" VARCHAR(5000) NOT NULL,
    "localizacao" VARCHAR(300) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ponto_turistico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(150) NOT NULL,
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_loja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "loja_id" UUID NOT NULL,
    "produto_id" UUID NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "marca" VARCHAR(200),
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "produto_loja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "loja_email_key" ON "loja"("email");

-- AddForeignKey
ALTER TABLE "categoria_loja" ADD CONSTRAINT "categoria_loja_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoria_loja" ADD CONSTRAINT "categoria_loja_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoria_produto" ADD CONSTRAINT "categoria_produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoria_produto" ADD CONSTRAINT "categoria_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loja_estacionamento" ADD CONSTRAINT "loja_estacionamento_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loja_funcionamento" ADD CONSTRAINT "loja_funcionamento_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_loja" ADD CONSTRAINT "produto_loja_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_loja" ADD CONSTRAINT "produto_loja_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
