import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UtensilsCrossed, Waves, Coffee, Pizza, IceCream, Apple } from 'lucide-react';

const pratosCulinarios = [
  { nome: 'Caranguejo', descricao: 'O rei de Aracaju, servido cozido com temperos tradicionais e pirão.', categoria: 'Frutos do Mar', icone: Waves },
  { nome: 'Aratu na Palha', descricao: 'Crustáceo típico do mangue, cozido na palha de bananeira.', categoria: 'Frutos do Mar', icone: Waves },
  { nome: 'Carne de Sol', descricao: 'Servida com pirão de leite, feijão fradinho e macaxeira.', categoria: 'Carnes', icone: UtensilsCrossed },
  { nome: 'Moqueca de Camarão', descricao: 'Tradicional moqueca sergipana feita com camarões frescos e dendê.', categoria: 'Frutos do Mar', icone: Waves },
  { nome: 'Beiju de Tapioca', descricao: 'Fina massa de mandioca com recheios variados (coco, queijo, etc).', categoria: 'Lanches', icone: Coffee },
  { nome: 'Cuscuz Sergipano', descricao: 'Cuscuz de milho servido com leite de coco ou acompanhamentos.', categoria: 'Tradicional', icone: Coffee },
  { nome: 'Pastel de Carne', descricao: 'Famoso nas feiras livres e mercados centrais de Aracaju.', categoria: 'Lanches', icone: Pizza },
  { nome: 'Peixe na Brasa', descricao: 'Peixes frescos pescados na região, assados no carvão.', categoria: 'Frutos do Mar', icone: Waves },
  { nome: 'Pudim de Leite', descricao: 'Sobremesa clássica presente em todos os restaurantes locais.', categoria: 'Sobremesa', icone: IceCream },
  { nome: 'Sururu', descricao: 'Molusco servido ao molho de coco ou em caldinhos.', categoria: 'Frutos do Mar', icone: Waves },
  { nome: 'Maniçoba', descricao: 'Prato feito com a folha da mandioca e carnes defumadas.', categoria: 'Tradicional', icone: UtensilsCrossed },
  { nome: 'Sarapatel', descricao: 'Guisado feito com miúdos de porco ou carneiro.', categoria: 'Tradicional', icone: UtensilsCrossed },
  { nome: 'Buchada', descricao: 'Tradicional buchada de bode, muito apreciada na região.', categoria: 'Tradicional', icone: UtensilsCrossed },
  { nome: 'Galinhada', descricao: 'Arroz com frango caipira bem temperado.', categoria: 'Aves', icone: UtensilsCrossed },
  { nome: 'Queijo Coalho', descricao: 'Assado na chapa com melaço ou orégano.', categoria: 'Petiscos', icone: Coffee },
  { nome: 'Tapioca de Coco', descricao: 'Símbolo do café da manhã sergipano.', categoria: 'Lanches', icone: Coffee },
  { nome: 'Pirão de Leite', descricao: 'Acompanhamento essencial para a carne de sol.', categoria: 'Tradicional', icone: Coffee },
  { nome: 'Feijão de Corda', descricao: 'Cozido com maxixe, quiabo e abóbora.', categoria: 'Tradicional', icone: Apple },
  { nome: 'Paçoca de Carne', descricao: 'Farofa crocante com carne de sol desfiada.', categoria: 'Acompanhamentos', icone: UtensilsCrossed },
  { nome: 'Sorvete de Frutas', descricao: 'Sabores exóticos como mangaba, cajá e graviola.', categoria: 'Sobremesa', icone: IceCream },
  { nome: 'Suco de Mangaba', descricao: 'A fruta símbolo de Sergipe em sua melhor forma.', categoria: 'Bebidas', icone: Apple },
  { nome: 'Batida de Coco', descricao: 'Bebida refrescante feita com leite de coco fresco.', categoria: 'Bebidas', icone: Waves },
  { nome: 'Dadinho de Tapioca', descricao: 'Petisco moderno feito com tapioca e queijo coalho.', categoria: 'Petiscos', icone: Pizza },
  { nome: 'Camarão Alho e Óleo', descricao: 'Petisco clássico da Orla de Atalaia.', categoria: 'Petiscos', icone: Waves },
  { nome: 'Caldo de Cana', descricao: 'Servido gelado, acompanhamento perfeito para o pastel.', categoria: 'Bebidas', icone: Coffee },
  { nome: 'Bolo de Rolo', descricao: 'Fina camada de pão de ló com recheio de goiabada.', categoria: 'Sobremesa', icone: IceCream },
  { nome: 'Cartola', descricao: 'Banana assada com queijo, açúcar e canela.', categoria: 'Sobremesa', icone: IceCream },
  { nome: 'Arroz Doce', descricao: 'Cozido com leite e canela, cremoso e reconfortante.', categoria: 'Sobremesa', icone: IceCream },
  { nome: 'Pamonha', descricao: 'Feita de milho verde, doce ou salgada.', categoria: 'Tradicional', icone: Apple },
  { nome: 'Canjica de Milho', descricao: 'Doce tradicional feito com milho e leite de coco.', categoria: 'Tradicional', icone: Apple },
];

export function Culinaria() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-4 mb-8 md:mb-12">
        <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-xl sm:rounded-2xl text-orange-600">
                <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Sabores de Aracaju</h1>
        </div>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
          Explore a riqueza gastronômica de Sergipe. Dos crustáceos dos nossos mangues às delícias do nosso sertão.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {pratosCulinarios.map((prato, index) => {
          const Icon = prato.icone;
          return (
            <Card key={index} className="group hover:border-orange-200 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{prato.nome}</CardTitle>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    {prato.categoria}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {prato.descricao}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
