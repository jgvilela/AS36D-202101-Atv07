// Este codigo faz a leitura de dados para apps coletadas do Google Play

const fs = require('fs');
const csvparse = require('csv-parse/lib/sync');

// Le cada linha do arquivo csv como um objeto e armazena no array 'app'
let apps = csvparse(fs.readFileSync('./gplaydata.csv', 'utf-8'), {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
});
// converte alguns atributos que sao inicialmente lidos com strings
apps = apps.map(elem => {
    elem.score = parseFloat(elem.score);
    elem.installs = parseInt(elem.installs);
    elem.androidVersion = parseFloat(elem.androidVersion);
    return elem;
});

console.log('Total de objetos deste array:', apps.length);
console.log('A estrutura do 1.o objeto:');
console.log(apps[0]);

// EXERCICIO 1: use reduce() para calcular o numero total de installs para todas as apps.
const appreduce = apps.reduce((anterior, atual) => ({installs: anterior.installs + atual.installs}));
console.log("O total de installs de todas as apps eh:",appreduce.installs);


// EXERCICIO 2: use filter() para selecionar somente apps com score maior que quatro (> 4)
const appfilter = apps.filter(elem => {return elem.score > 4});
// para não imprimir todos os objetos, abaixo está o número de apps que tem score maior que 4
console.log("Número de Apps com score maior que 4:", appfilter.length);


// EXERCICIO 3: use map() para mudar o atributo appname para lowerCase
console.log("Exemplo de app com nome em caixa alta antes da function map.",apps[12].appname);
const appmap = apps.map( elem => {
    elem.appname = elem.appname.toLowerCase();
    return elem
});
console.log("Exemplo do mesmo app após function map.",appmap[12].appname);
