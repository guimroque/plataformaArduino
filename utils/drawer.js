module.exports = {

    drawerDuels(){
        function sortear() {
            var num = Math.floor(Math.random() * 12);

            return num;
        }

        var arrayHumanos = [];
        var arrayDinossauros = [];
        var sorteados = 0;

        var equipes = [
            {
                num: 0,
                nome: 'a',
                status: 0
            },

            {
                num: 1,
                nome: 'b',
                status: 0
            },

            {
                num: 2,
                nome: 'c',
                status: 0
            },

            {
                num: 3,
                nome: 'd',
                status: 0
            },

            {
                num: 4,
                nome: 'e',
                status: 0
            },

            {
                num: 5,
                nome: 'f',
                status: 0
            },

            {
                num: 6,
                nome: 'g',
                status: 0
            },

            {
                num: 7,
                nome: 'h',
                status: 0
            },

            {
                num: 8,
                nome: 'i',
                status: 0
            },

            {
                num: 9,
                nome: 'j',
                status: 0
            },

            {
                num: 10,
                nome: 'k',
                status: 0
            },

            {
                num: 11,
                nome: 'l',
                status: 0
            }
        ];

        while (sorteados != 12) {
            var numero = sortear();
            

            switch (numero) {
                case 0:
                    if(equipes[0].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[0].nome);
                        sorteados++;
                        equipes[0].status = 1;
                        console.log('É humano');
                    }else if(equipes[0].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[0].nome);
                        sorteados++;
                        equipes[0].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 1:
                    if(equipes[1].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[1].nome);
                        sorteados++;
                        equipes[1].status = 1;
                        console.log('É humano');
                    }else if(equipes[1].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[1].nome);
                        sorteados++;
                        equipes[1].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 2:
                    if(equipes[2].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[2].nome);
                        sorteados++;
                        equipes[2].status = 1;
                        console.log('É humano');
                    }else if(equipes[2].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[2].nome);
                        sorteados++;
                        equipes[2].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 3:
                    if(equipes[3].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[3].nome);
                        sorteados++;
                        equipes[3].status = 1;
                        console.log('É humano');
                    }else if(equipes[3].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[3].nome);
                        sorteados++;
                        equipes[3].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 4:
                    if(equipes[4].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[4].nome);
                        sorteados++;
                        equipes[4].status = 1;
                        console.log('É humano');
                    }else if(equipes[4].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[4].nome);
                        sorteados++;
                        equipes[4].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 5:
                    if(equipes[5].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[5].nome);
                        sorteados++;
                        equipes[5].status = 1;
                        console.log('É humano');
                    }else if(equipes[5].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[5].nome);
                        sorteados++;
                        equipes[5].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 6:
                    if(equipes[6].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[6].nome);
                        sorteados++;
                        equipes[6].status = 1;
                        console.log('É humano');
                    }else if(equipes[6].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[6].nome);
                        sorteados++;
                        equipes[6].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 7:
                    if(equipes[7].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[7].nome);
                        sorteados++;
                        equipes[7].status = 1;
                        console.log('É humano');
                    }else if(equipes[7].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[7].nome);
                        sorteados++;
                        equipes[7].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 8:
                    if(equipes[8].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[8].nome);
                        sorteados++;
                        equipes[8].status = 1;
                        console.log('É humano');
                    }else if(equipes[8].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[8].nome);
                        sorteados++;
                        equipes[8].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 9:
                    if(equipes[9].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[9].nome);
                        sorteados++;
                        equipes[9].status = 1;
                        console.log('É humano');
                    }else if(equipes[9].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[9].nome);
                        sorteados++;
                        equipes[9].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 10:
                    if(equipes[10].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[10].nome);
                        sorteados++;
                        equipes[10].status = 1;
                        console.log('É humano');
                    }else if(equipes[10].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[10].nome);
                        sorteados++;
                        equipes[10].status = 1;
                        console.log('É dino');
                    }
                    break;

                case 11:
                    if(equipes[11].status == 0 && (sorteados % 2 == 0)){
                        arrayHumanos.push(equipes[11].nome);
                        sorteados++;
                        equipes[11].status = 1;
                        console.log('É humano');
                    }else if(equipes[11].status == 0 && (sorteados % 2 != 0)){
                        arrayDinossauros.push(equipes[11].nome);
                        sorteados++;
                        equipes[11].status = 1;
                        console.log('É dino');
                    }
                    break;
            }

        }

        return {
            dinos: arrayDinossauros, 
            humans: arrayHumanos
        };
    }

}