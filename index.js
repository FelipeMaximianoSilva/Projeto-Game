var prompt = require('prompt-sync')();

//console.log("Hello World!");

//-------------------------------------------------------------//----------------------------------------------------------------//
//-------------------------------------------------------VARIAVEIS INICIADAS-----------------------------------------------------//
//-------------------------------------------------------------//----------------------------------------------------------------//

let addskill = 0;
let acao = 0;
let horas = 4;
let minutos = 0;

//-------------------------------------------------------------//----------------------------------------------------------------//
//-----------------------------------------------------------OBJETOS-------------------------------------------------------------//
//-------------------------------------------------------------//----------------------------------------------------------------//

const agente = {
    nome: '',
    idade: 39,
    inventario: [],
    pos: 1,
}

const action = {
    kill: 0,
    stealthkill: 0,
}

const skills = {
    stealth: 0,
    forca: 0,
    agilidade: 0,
    sorte: 0,
    Exp: 0,
}

const mapa = {
    pos: ['',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    leg: ['','Inicio do Corredor Principal', 'Esquina entre corredor principal e passagem subterrânea', 'Portas do Lab. e do Armazém', 'Laboratório de Pesquisas Bélicas', 'Armazém', 
         'Passagem Subterrânea', 'Porta do Arsenal', 'Porta da Sala de Controle Nuclear', 'Dormitórios', 'Arsenal', 'Sala de Controle Nuclear'],
}

const endgameStats = {
    bosskill: 0,
    bombdesat: 0,
    indexroub: 0,
    escolhaindex: 0,
    endtotal: 0,
    semtempo: 0,
}

const itens = {
    code: ['', 'Supressor', 'Chave do Arsenal', 'Cartão de Acesso a Sala de Controle Nuclear'],
}

const acaounica = {
    matousala: 0,
    entrardorm: 0,
    entrarlab: 0,
    entrararm: 0,
    entrarars: 0,
    entrarboss: 0,
    verificasala: ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    alarme: 0,
    desarmabomb: 0,
    matacient: 0,
    mataboss: 0,
    leuindex: 0,
}

//-------------------------------------------------------------//----------------------------------------------------------------//
//-----------------------------------------------------------FUNÇÕES-------------------------------------------------------------//
//-------------------------------------------------------------//----------------------------------------------------------------//


//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------CTRL-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function startgame ()
{
    let inicio = prompt("Deseja iniciar um novo jogo? ").toUpperCase();
    if (inicio == 'SIM' || inicio == 'S')
    {
        reset();
        while(agente.nome == '')
        {
            let nome = prompt("Digite o nome do Agente: ");
            agente.nome = nome;
        }
        historia(0);
        distskill();
        acoes();
    }
    else if(inicio == 'NAO' || inicio == 'N' || inicio == 'NO')
    {
        console.log("O jogo será finalizado!\n");
    }
    else
    {
        console.log("Parametro Inválido!\n");
        startgame();
    }
}

function reset()
{
    addskill = 0;
    acao = 0;
    horas = 4;
    minutos = 0;

    agente.nome = '';
    agente.idade = 39;
    agente.inventario = [];
    agente.pos = 1;
    
    skills.stealth = 0;
    skills.forca = 0;
    skills.agilidade = 0;
    skills.sorte = 0;
    skills.Exp = 0;

    endgameStats.bosskill = 0;
    endgameStats.bombdesat = 0;
    endgameStats.indexroub = 0;
    endgameStats.escolhaindex = 0;
    endgameStats.endtotal = 0;
    endgameStats.semtempo = 0;


    acaounica.matousala = 0
    acaounica.entrardorm = 0;
    acaounica.entrarlab = 0;
    acaounica.entrararm = 0;
    acaounica.entrarars = 0;
    acaounica.entrarboss = 0;
    acaounica.verificasala = ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    acaounica.alarme = 0;
    acaounica.desarmabomb = 0;
    acaounica.matacient = 0;
    acaounica.mataboss = 0;
    acaounica.leuindex = 0;
}

function endgame()
{
    if(endgameStats.bombdesat == 1 && endgameStats.bosskill == 1)
    {
        //Simplesmente Matou o Boss e Desativou a bomba
        console.log("\nVocê cumpriu sua missão Agente! A bomba foi desarmada e o alvo foi eliminado, a equipe de evacuação chegará ao local em 10 minutos.\n");
        historia(10);
        endgameStats.endtotal = 1;
        startgame();
    }
    else if(endgameStats.indexroub == 1)
    {
        if(endgameStats.escolhaindex == 1)
        {
            //Leu o Index e desativou a bomba
            historia(8);
            historia(10);
            endgameStats.endtotal = 1;
            startgame();
        }
        else if(endgameStats.escolhaindex == 2)
        {
            //Não desativou a bomba
            historia(9);
            historia(10);
            endgameStats.endtotal = 1;
            startgame();
        }
    }
    else if(endgameStats.semtempo == 1)
    {
        historia(11);
        historia(10);
        endgameStats.endtotal = 1;
        startgame();
    }
}


//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------CTRL-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------SKILL------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function verificaup()
{
if (skills.Exp >= 10)
    {
        skp++;
        distskill();
        skills.Exp = 0;
    }
}

function distskill ()
{
    console.log("Neste jogo temos a seguinte árvore de skills: \n->Furtividade\n->Força\n->Agilidade\n->Sorte\nConforme o Agente realiza ações, ele ganha pontos de Experiência, ao atingir 10 pontos, ele ganha um Skill Point para dar um upgrade em uma de suas Skills.\n");
    if(skills.forca > 5 ||skills.sorte > 5 ||skills.stealth > 5 ||skills.agilidade > 5)
    {
        console.log(`Você tem mais ${skp} Skillpoint para usar!`);
        console.log("\nDigite onde deseja adicionar o ponto extra de upgrade: \n1 - Força\n2 - Sorte\n3 - Furtividade\n4 - Agilidade.\n")
        addskill = +prompt("Selecione o número da Skill que deseja aumentar: ");
        while(isNaN(addskill) || addskill < 1 || addskill > 4)
        {
            addskill = +prompt("Parametro inválido, selecione o número da Skill que deseja aumentar: ");
        }
            if(addskill == 1)
            {
                verificaskill(skills.forca);
                if(skills.forca >= 10)
                {
                    skp = 1;
                    distskill();
                    skills.forca = 10;
                }
                else
                {
                skills.forca++;
                console.log(`Voce agora possui ${skills.forca} pontos em Força`);
                skp--;
                }
            }
            else if(addskill == 2)
            {
                verificaskill(skills.sorte);
                if(skills.sorte >= 10)
                {
                    skp = 1;
                    distskill();
                    skills.sorte = 10;
                }
                else
                {
                skills.sorte++;
                console.log(`Voce agora possui ${skills.sorte} pontos em Sorte`);
                skp--;
                }
            }
            else if(addskill == 3)
            {
                verificaskill(skills.stealth);  
                if(skills.stealth >= 10)
                {
                    skp = 1;
                    distskill();
                    skills.stealth = 10;
                }
                else
                {
                skills.stealth++;
                console.log(`Voce agora possui ${skills.stealth} pontos em Furtividade`);
                skp--;
                }
            }
            else if(addskill == 4)
            {
                verificaskill(skills.agilidade);
                if(skills.agilidade >= 10)
                {
                    skp = 1;
                    distskill();
                    skills.agilidade = 10;
                }
                else
                {
                skills.agilidade++;
                console.log(`Voce agora possui ${skills.agilidade} pontos em Agilidade`);
                skp--;
                }
            }
    }
    else
    {
        console.log("Você está iniciando o jogo, tem 20 Skill Points para distribuir em Furtividade, Força, Agilidade e Sorte!");
        skp = 20;
        while(skp > 0)
        {
            console.log(`Você ainda têm ${skp} para distribuir, selecione uma skill para adicionar a quantidade desejada: `);
            let escolha = +prompt("1-Força 2-Sorte 3-Furtividade 4-Agilidade ");
            while(isNaN(escolha) || escolha < 1 || escolha > 4)
            {
                escolha = +prompt("Parametro inválido, selecione o número da Skill que deseja aumentar: ");
            }
                if(escolha == 1)
                {
                    qntskp = +prompt("Quantos pontos deseja adicionar em Força? ")
                    while(qntskp > skp)
                    {
                        qntskp = +prompt("Quantidade indisponível, selecione novamente quanto deseja aumentar: ")
                    }
                    skills.forca = skills.forca + qntskp;
                    if(skills.forca > 10)
                    {
                        skp = skp + (skills.forca - 10);
                    }
                    verificaskill(skills.forca);
                    console.log(`Voce agora possui ${skills.forca} pontos em Força`);
                    skp = skp - qntskp;
                }
                else if(escolha == 2)
                {
                    let qntskp = +prompt("Quantos pontos deseja adicionar em Sorte? ")
                    while(qntskp > skp)
                    {
                        qntskp = +prompt("Quantidade indisponível, selecione novamente quanto deseja aumentar: ")
                    }
                    skills.sorte = skills.sorte + qntskp;
                    if(skills.sorte > 10)
                    {
                        skp = skp + (skills.sorte - 10);
                    }
                    verificaskill(skills.sorte);
                    console.log(`Voce agora possui ${skills.sorte} pontos em Sorte`)
                    skp = skp - qntskp;
                }
                else if(escolha == 3)
                {
                    let qntskp = +prompt("Quantos pontos deseja adicionar em Furtividade? ");
                    while(qntskp > skp)
                    {
                        qntskp = +prompt("Quantidade indisponível, selecione novamente quanto deseja aumentar: ");
                    }
                    skills.stealth = skills.stealth + qntskp;
                    if(skills.stealth > 10)
                    {
                        skp = skp + (skills.stealth - 10);
                    }
                    verificaskill(skills.stealth);
                    console.log(`Voce agora possui ${skills.stealth} pontos em Furtividade`);
                    skp = skp - qntskp;
                }
                else if(escolha == 4)
                {
                    let qntskp = +prompt("Quantos pontos deseja adicionar em Agilidade? ");
                    while(qntskp > skp)
                    {
                        qntskp = +prompt("Quantidade indisponível, selecione novamente quanto deseja aumentar: ")
                    }
                    skills.agilidade = skills.agilidade + qntskp;
                    if(skills.agilidade > 10)
                    {
                        skp = skp + (skills.agilidade - 10);
                    }
                    verificaskill(skills.agilidade);
                    console.log(`Voce agora possui ${skills.agilidade} pontos em Agilidade`);
                    skp = skp - qntskp;
                }
        }
        console.log(`A distribuição de pontos ficou: \nForça: ${skills.forca}\nSorte: ${skills.sorte}\nFurtividade: ${skills.stealth}\nAgilidade: ${skills.agilidade}`);
    }
}

function verificaskill(skill)
{
    if(skill >= 10)
    {
        console.log(`Você atingiu o limite de 10 pontos nessa skill, não é possível melhora-la!`);
        skill = 10;
        return skill;
    }
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------SKILL-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function historia (num)
{
    if(num == 0)
    {
        console.log(`\nAgente ${agente.nome}, 39 Anos, Membro da Interpol, tem como missão invadir uma instalação búlgara, matar o Coronel Vladislav e desativar o controle de bombas nucleares da base, você terá 4 horas para finalizar a missão, em caso de falha, toda Europa será destruída. Boa sorte Agente!\n`);
    }
    else if(num == 1)
    {
        console.log("\nVocê entrou nos Dormitórios e encontra dois soldados dormindo, utilize sua furtividade para elimina-los.\n");
    }
    else if(num == 2)
    {
        console.log("\nAo entrar no laboratório, você encontra o Cientista Chefe Mikhail Vassiliev, responsável pelo desenvolvimento das Bombas Nucleares, e com ele, a chave de acesso ao Arsenal, entretanto, há mais 2 soldados para sua proteção!\n");
    }
    else if(num == 3)
    {
        console.log("\nComo dizia a mensagem encontrada em Mikhail, aqui está o novo apetrecho desenvolvido por ele, pode me ser útil nessa jornada!\n");
    }
    else if(num == 4)
    {
        console.log("\nPor sorte, o Arsenal se encontra vazio, dentro dele há apenas um grande cofre fortemente protegido e o cartão de acesso para a Sala de Controle Nuclear!\n");
    }
    else if(num == 5)
    {
        console.log("\nAo abrir a porta da sala, você encontra o Coronel Goncharov, sozinho, ele não aparenta estar surpreso com sua presença: 'Не мога да ти позволя да направиш това'(Não posso deixar você fazer isso), 'Você não será o suficiente para me impedir!', 'Знам, че не съм достатъчен, но се надявам наистина да разберете истината за това, което наистина се случва.'(Eu sei que não sou o suficiente, mas espero que você realmente entenda a verdade sobre o que realmente está acontecendo!)\n");
    }
    else if(num == 6)
    {
        console.log("\nApós eliminar a todos no Laboratório, você encontra no bolso do Cientista Chefe a 'Chave do Arsenal', junto dela, também encontra um papel contendo informações sobre uma nova tecnologia subsônica que se encontra no Armazém");
    }
    else if(num == 7)
    {
        console.log("\nVocê eliminou o Coronel Goncharov, ao verificar a sala em busca de provas, você encontra um papel com 4 números, '1704' e uma chave semelhante a do Arsenal, o que seria isso?");
    }
    else if(num == 8)
    {
        console.log(`\nMesmo com todas informações contidas no Index encontrado, Agente ${agente.nome} desarmou as bombas e encerrou de uma vez por todas as atividades do Coronel Goncharov e entregou o Index a Interpol.\nCerca de 3 meses depois da missão, ${agente.nome} foi encontrado morto em seu apartamento sem rastros do assassino.\n`)
    }
    else if(num == 9)
    {
        console.log(`\nDepois de ler todas as informações contidas no Index, Agente ${agente.nome} entende o propósito de toda essa operação do Coronel Goncharov, após a contagem regressiva chegar a 00:00:00, ele escuta o som das bombas sendo acionadas, e aguarda, junto da base, entendendo seu sacrifício necessário.\nOs corpos de Agente ${agente.nome} e do Coronel Goncharov nunca foram encontrados em meio aos destroços\n`);
    }
    else if(num == 10)
    {
        console.log("//----------------------------------------FIM DO JOGO----------------------------------------//\n")
    }
    else if(num == 11)
    {
        console.log(`\nO tempo chegou ao fim Agente ${agente.nome}, você falhou em sua missão e as bombas foram acionadas.`);
    }
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------TIME-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function passatempo (h, m)
{
    agilidade = skills.agilidade / 10;
    horas = horas - h + (h * agilidade);
    minutos = minutos - m + (m * agilidade);
    if(horas <= 0 && minutos <= 0)
    {   
        endgameStats.semtempo = 1;
        endgame();
        startgame();
    }
    else if(minutos < 0)
    {
        minutos = minutos + 60;
        horas = horas - 1;
    }
    horas = Math.round(horas);
    minutos = Math.round(minutos);
    console.log(`\nRestam ${(horas)} horas e ${(minutos)} minutos para a detonação!\n`);
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------TIME-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------AÇÃO-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function acoes ()
{
//Criar condicionais para cada situação
//CORREDORES
while(endgameStats.endtotal == 0)
{
    while(agente.pos == 1 || agente.pos == 2 || agente.pos == 3 || agente.pos == 6 || agente.pos == 7 || agente.pos == 8)
    {
        while(acaounica.matousala == 0)
        {
            spawnenemy();
            while(enemy != 0)
            {
                console.log(`\nHá ${enemy} inimigos no local\n`);
                console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                    {
                        chancekill('stealthkill');
                    }
                else if(acao == 2)
                    {
                        chancekill('kill');
                    }
                else
                    {
                        console.log("\nNão é possível realizar esta ação no momento!\n");
                    }
            }
            acaounica.matousala = 1;
        }
        console.log("Você pode:\n1 - Mover\n2 - Procurar\n"); 
        acao = +prompt("O que deseja fazer? ");
        if(acao == 1)
        {
            controlepos(agente.pos);
            acaounica.matousala = 0;
        }
        else if(acao == 2)
        {  
            if(acaounica.verificasala[agente.pos] == 0)
            {
                encontraitem();
                passatempo(0,10);
                skills.Exp = skills.Exp + 1;
                acaounica.verificasala[agente.pos] = 1;
            }
            else
            {
                console.log("\nEssa sala já foi verificada!\n");
                console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
            }
        }
    }
    //SALAS
    while(agente.pos == 4 || agente.pos == 5 || agente.pos == 9 || agente.pos == 10 || agente.pos == 11)
    {
        if(agente.pos == 4)
        {
            if(acaounica.entrarlab == 0)
            {
                historia(2);
                enemy = 3;
                while(enemy != 0)
                {
                console.log(`\nHá ${enemy} inimigos no local\n`);
                console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                    {
                        chancekill('stealthkill');
                    }
                else if(acao == 2)
                    {
                        chancekill('kill');
                    }
                else
                    {
                        console.log("\nNão é possível realizar esta ação no momento!\n");
                    }
                }
                acaounica.matacient = acaounica.matacient + 1;
                console.log("Você pode:\n1 - Mover\n2 - Procurar\n"); 
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {
                    controlepos(agente.pos);
                    acaounica.matousala = 0;
                }
                else if(acao == 2)
                {  
                    if(acaounica.verificasala[agente.pos] == 0)
                    {
                        historia(6);
                        encontraitem();
                        passatempo(0,10);
                        skills.Exp++;
                        acaounica.verificasala[agente.pos] = 1;
                    }
                    else
                    {
                        console.log("\nEssa sala já foi verificada!\n");
                        console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
                    }
                }
                acaounica.entrarlab = 1;
            }
        }
        else if(agente.pos == 5)
        {
            if(acaounica.entrararm == 0 && acaounica.matacient == 1)
            {
                historia(3);
                acaounica.entrararm = 1;
                while(acaounica.matousala == 0)
                {
                    spawnenemy();
                    while(enemy != 0)
                    {
                        console.log(`\nHá ${enemy} inimigos no local\n`);
                        console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
                        acao = +prompt("O que deseja fazer? ");
                        if(acao == 1)
                            {
                                chancekill('stealthkill');
                            }
                        else if(acao == 2)
                            {
                                chancekill('kill');
                            }
                        else
                            {
                                console.log("\nNão é possível realizar esta ação no momento!\n");
                            }
                    }
                    acaounica.matousala = 1;
                }
                console.log("Você pode:\n1 - Mover\n2 - Procurar\n"); 
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {
                    controlepos(agente.pos);
                    acaounica.matousala = 0;
                }
                else if(acao == 2)
                {  
                    if(acaounica.verificasala[agente.pos] == 0)
                    {
                        encontraitem();
                        passatempo(0,10);
                        skills.Exp = skills.Exp + 1;
                        acaounica.verificasala[agente.pos] = 1;
                    }
                    else
                    {
                        console.log("\nEssa sala já foi verificada!\n");
                        console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
                    }
                }
            }
        }
        else if(agente.pos == 9)
        {
            if(acaounica.entrardorm == 0)
            {
                historia(1);
                acaounica.entrardorm = 1;
                while(acaounica.matousala == 0)
                {
                    spawnenemy();
                    while(enemy != 0)
                    {
                        console.log(`\nHá ${enemy} inimigos no local\n`);
                        console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
                        acao = +prompt("O que deseja fazer? ");
                        if(acao == 1)
                            {
                                chancekill('stealthkill');
                            }
                        else if(acao == 2)
                            {
                                chancekill('kill');
                            }
                        else
                            {
                                console.log("\nNão é possível realizar esta ação no momento!\n");
                            }
                    }
                    acaounica.matousala = 1;
                }
                console.log("Você pode:\n1 - Mover\n2 - Procurar\n"); 
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {
                    controlepos(agente.pos);
                    acaounica.matousala = 0;
                }
                else if(acao == 2)
                {  
                    if(acaounica.verificasala[agente.pos] == 0)
                    {
                        encontraitem();
                        passatempo(0,10);
                        skills.Exp = skills.Exp + 1;
                        acaounica.verificasala[agente.pos] = 1;
                    }
                    else
                    {
                        console.log("\nEssa sala já foi verificada!\n");
                        console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
                    }
                }
            }
        }
        else if(agente.pos == 10)
        {
            if(acaounica.entrarars == 0)
            {
                historia(4);
                acaounica.entrarars = 1;
                console.log("Você pode:\n1 - Mover\n2 - Procurar\n"); 
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {
                    controlepos(agente.pos);
                    acaounica.matousala = 0;
                }
                else if(acao == 2)
                {  
                    if(acaounica.verificasala[agente.pos] == 0)
                    {
                        encontraitem();
                        passatempo(0,10);
                        skills.Exp = skills.Exp + 1;
                        acaounica.verificasala[agente.pos] = 1;
                    }
                    else
                    {
                        console.log("\nEssa sala já foi verificada!\n");
                        console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
                    }
                }
            }
            if(acaounica.entrarars = 1)
            {
                    console.log("Você entrou no Arsenal")
            }
            if (acaounica.mataboss == 1 || endgameStats.bosskill == 1)
            {
                console.log("Você está em frente ao cofre, insira a senha para ter acesso ao conteúdo: \n");
                senha = +prompt();
            while(endgameStats.escolhaindex == 0)
                {
                while(senha != 1704)
                {
                    console.log("Senha incorreta, tente novamente!\n");
                    senha = +prompt();
                }
                index = ['Coronel Goncharov, como informado em nossas conversas, o Governo Britânico está desenvolvendo armas químicas e realizando testes em algumas cidades na região de Plovdiv matando mais de 500 e ferindo 2.500 residentes na região, a mídia está sendo pressionada a esconder toda a situação e estamos de mãos atadas, sua missão será enviar os misseís para destruir os laboratórios de desenvolvimento e o armazém onde são mantidas essas armas. Eles já estão ciente dessa ação e devem enviar algum agente para impedi-lo, ao finalizar, a base entrará em modo de auto-destruição automáticamente. Seu sacrifício será uma honra a toda Bulgária!'];
                console.log(index)
                acaounica.leuindex = 1;
                endgameStats.indexroub = 1;
                console.log("\nVocê pode:\n1-Desarmar a bomba\n2-Não Desarmar")
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {   
                    endgameStats.escolhaindex = 1;
                    endgame();
                }
                else if(acao == 2)
                {
                    endgameStats.escolhaindex = 2;
                    endgame();
                }
                else
                {
                    console.log("\nNão é possível realizar esta ação no momento!\n");
                }
                }
            }
        }
        else
        {
            if(acaounica.entrarboss == 0)
            {
                historia(5);
                enemy = 1;
                while(enemy != 0)
                {
                console.log(`\nO Coronel é o único inimigo no local.\n`);
                console.log("Você pode:\n1-Assassinar");
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                    {
                        chancekill('kill');
                        acaounica.mataboss = acaounica.mataboss + 1;
                        endgameStats.bosskill = 1;
                    }
                else
                    {
                        console.log("\nNão é possível realizar esta ação no momento!\n");
                    }
                }
                console.log("Você pode:\n1 - Mover\n2 - Procurar\n3 - Desarmar a bomba\n"); 
                acao = +prompt("O que deseja fazer? ");
                if(acao == 1)
                {
                    controlepos(agente.pos);
                    acaounica.matousala = 0;
                }
                else if(acao == 2)
                {  
                    if(acaounica.verificasala[agente.pos] == 0)
                    {
                        historia(7);
                        passatempo(0,10);
                        skills.Exp++;
                        acaounica.verificasala[agente.pos] = 1;
                    }
                    else
                    {
                        console.log("\nEssa sala já foi verificada!\n");
                        console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
                    }
                }
                else if(acao == 3)
                {
                    acaounica.desarmabomb = 1;
                    endgameStats.bombdesat = 1;
                    endgame();
                    break;
                }
                acaounica.entrarboss = 1;
            }
        }
        while(acaounica.matousala == 0)
        {
            spawnenemy();
            while(enemy != 0)
            {
            console.log(`\nHá ${enemy} inimigos no local\n`);
            console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
            acao = +prompt("O que deseja fazer? ");
            if(acao == 1)
            {
                chancekill('stealthkill');
            }
            else if(acao == 2)
            {
                chancekill('kill');
            }
            else
            {
                console.log("\nNão é possível realizar esta ação no momento!\n");
                console.log("Você pode:\n1-Matar Furtivamente\n2-Assassinar");
            }
            }
            acaounica.matousala = 1;
        }
        console.log("Você pode:\n1 - Mover\n2 - Procurar\n");
        acao = +prompt("O que deseja fazer? ");
        if(acao == 1)
        {
            controlepos(agente.pos);
            acaounica.matousala = 0;
        }
        else if(acao == 2)
        {  
            if(acaounica.verificasala[agente.pos] == 0)
            {
                encontraitem();
                passatempo(0,10);
                skills.Exp++;
                acaounica.verificasala[agente.pos] = 1;
            }
            else
            {
                console.log("\nEssa sala já foi verificada!\n");
                console.log("\nNão há mais o que fazer nesta sala, vá a outro lugar!\n");
            }
        }
    }
}
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------AÇÃO-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------ITEM-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function verificaitem(item)
{
    for(i = 0; i < 3; i++)
    {
        if(item === agente.inventario[i])
        {
            return true;
        }
    }
    return false;
}

function encontraitem()
{
    if(agente.pos == 4 || agente.pos == 5 || agente.pos == 10)
    {
        if(agente.pos == 4)
        {
            agente.inventario.push('Chave do Arsenal');
            console.log(`Você encontrou a 'Chave do Arsenal'\n`);
            return true;
        }
        else if(agente.pos == 5)
        {
            agente.inventario.push('Supressor');
            console.log(`Você encontrou 'Supressor Subsônico'`);
            console.log("\nCom ele será possível efetuar eliminações furtivas sem o risco de ser detectado!\n")
            return true;
        }
        else 
        {
            agente.inventario.push('Cartão de Acesso a Sala de Controle Nuclear');
            console.log(`Você encontrou 'Cartão de Acesso a Sala de Controle Nuclear'\n`);
            return true;
        }
    }
    console.log("Não foi encontrado nada!\n");
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------ITEM-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//


//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------POSI-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function controlepos (pos)
{
    if(pos == 1)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[2]}" ou para "${mapa.leg[9]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[2]} = ${mapa.pos[2]} e ${mapa.leg[9]} = ${mapa.pos[9]}) `);
        while(pos != mapa.pos[2] && pos != mapa.pos[9])
        {
            pos = 1;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[2]}" ou voltar para "${mapa.leg[9]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 2)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[3]}", para "${mapa.leg[6]}" ou voltar para "${mapa.leg[1]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[3]} = ${mapa.pos[3]}, ${mapa.leg[6]} = ${mapa.pos[6]} e ${mapa.leg[1]} = ${mapa.pos[1]}) `);
        while(pos != mapa.pos[3] && pos != mapa.pos[6] && pos != mapa.pos[1])
        {
            pos = 2;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[3]}", para "${mapa.leg[6]}" ou voltar para "${mapa.leg[1]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 3)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[4]}", para "${mapa.leg[5]}" ou voltar para "${mapa.leg[2]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[4]} = ${mapa.pos[4]}, ${mapa.leg[5]} = ${mapa.pos[5]} e ${mapa.leg[2]} = ${mapa.pos[2]}) `);
        while(pos != mapa.pos[4] && pos != mapa.pos[5] && pos != mapa.pos[2])
        {
            pos = 3;
            console.log('')
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[4]}", para "${mapa.leg[5]}" ou voltar para "${mapa.leg[2]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 4)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode voltar para "${mapa.leg[3]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[3]} = ${mapa.pos[3]}) `);
        while(pos != mapa.pos[3])
        {
            pos = 4;
            console.log('')
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[3]}, para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 5)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode voltar para "${mapa.leg[3]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[3]} = ${mapa.pos[3]}) `);
        while(pos != mapa.pos[3])
        {
            pos = 5;
            console.log('')
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[3]}, para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 6)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[7]}", para "${mapa.leg[8]}" ou voltar para "${mapa.leg[2]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[7]} = ${mapa.pos[7]}, ${mapa.leg[8]} = ${mapa.pos[8]} e ${mapa.leg[2]} = ${mapa.pos[2]}) `);
        while(pos != mapa.pos[7] && pos != mapa.pos[8] && pos != mapa.pos[2])
        {
            pos = 6;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[7]}", para "${mapa.leg[8]}" ou voltar para "${mapa.leg[2]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 7)
    {
        chave = verificaitem('Chave do Arsenal');
        if(chave == true)
        {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[10]}" ou voltar para "${mapa.leg[6]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[10]} = ${mapa.pos[10]} e ${mapa.leg[6]} = ${mapa.pos[6]}) `);
        while(pos != mapa.pos[10] && pos != mapa.pos[6])
        {
            pos = 7;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[10]}" ou voltar para "${mapa.leg[6]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
        }
        else
        {
            console.log(`\nVocê está em: "${mapa.leg[pos]}", para acessar "${mapa.leg[10]}" é necessário a 'Chave do Arsenal', você pode voltar para "${mapa.leg[6]}"\n`);
            pos = +prompt(`Para onde deseja ir? (${mapa.leg[6]} = ${mapa.pos[6]})`);
            while(pos != mapa.pos[6])
            {
                pos = 7;
                console.log('');
                pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", para acessar "${mapa.leg[10]}" é necessário a 'Chave do Arsenal', você pode voltar para "${mapa.leg[6]}", para onde deseja ir? `)
            }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
        }
    }
    else if(pos == 8)
    {
        chave = verificaitem('Cartão de Acesso a Sala de Controle Nuclear');
        if(chave == true)
        {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[11]}" ou voltar para "${mapa.leg[6]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[11]} = ${mapa.pos[11]} e ${mapa.leg[6]} = ${mapa.pos[6]}) `);
        while(pos != mapa.pos[11] && pos != mapa.pos[6])
        {
            pos = 8;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[11]}" ou voltar para "${mapa.leg[6]}", para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
        }
        else
        {
            console.log(`\nVocê está em: "${mapa.leg[pos]}", para acessar "${mapa.leg[11]}" é necessário a 'Cartão de Acesso a Sala de Controle Nuclear', você pode voltar para "${mapa.leg[6]}"\n`);
            pos = +prompt(`Para onde deseja ir? (${mapa.leg[6]} = ${mapa.pos[6]}) `);
            while(pos != mapa.pos[6])
            {
                pos = 8;
                console.log('');
                pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", para acessar "${mapa.leg[11]}" é necessário a 'Cartão de Acesso a Sala de Controle Nuclear', você pode voltar para "${mapa.leg[6]}", para onde deseja ir? `)
            }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
        }
    }
    else if(pos == 9)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[1]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[1]} = ${mapa.pos[1]}) `);
        while(pos != mapa.pos[1])
        {
            pos = 9;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[1]}, para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 10)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[7]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[7]} = ${mapa.pos[7]}) `);
        while(pos != mapa.pos[7])
        {
            pos = 10;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[7]}, para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
    else if(pos == 11)
    {
        console.log(`\nVocê está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[8]}"\n`);
        pos = +prompt(`Para onde deseja ir? (${mapa.leg[8]} = ${mapa.pos[8]}) `);
        while(pos != mapa.pos[8])
        {
            pos = 11;
            console.log('');
            pos = +prompt(`Não é possível ir para este local, você está em: "${mapa.leg[pos]}", você pode ir para "${mapa.leg[8]}, para onde deseja ir? `)
        }
            agente.pos = pos;
            console.log(`\nVocê foi para "${mapa.leg[pos]}"\n`);
            verificaup();
            passatempo(0,2);
            return pos;
    }
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------POSI-------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function calculasorte()
{
    lucky = (skills.sorte * 0.1);
    lucky = lucky + skills.sorte;
    return lucky;
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------ENEMY------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

function spawnenemy ()
{
    if(acaounica.alarme == 0)
    {
        if(agente.pos == 1 || agente.pos == 2 || agente.pos == 3 || agente.pos == 6 || agente.pos == 5)
        {
            enemy = 1;
        }
        else if(agente.pos == 7 || agente.pos == 8 || agente.pos == 9)
        {
            enemy = 2;
        }
    }
    else
    {
        if(agente.pos == 1 || agente.pos == 2 || agente.pos == 3 || agente.pos == 6 || agente.pos == 5)
        {
            enemy = 2;
        }
        else if(agente.pos == 7 || agente.pos == 8 || agente.pos == 9)
        {
            enemy = 3;
        }
    }
}


function chancekill (tipo)
{
    calculasorte();
    if(acaounica.alarme == 0)
    {
        if(tipo == 'kill')
        {
            probkill = (action.kill * 0.1) + skills.forca + lucky;
            probfail = Math.floor(Math.random() * 10);
            if(agente.pos == 11)
            {
                probkill = 100;
            }
            if(probkill >= probfail)
            {
                console.log("Inimigo eliminado com sucesso, o barulho não foi ouvido!");
                enemy--;
                action.Kill++;
                skills.Exp = skills.Exp + 0.5;
                passatempo(0,2);
            }
            else
            {
                console.log("O Inimigo detectou seu ataque e soou o alarme!");
                acaounica.alarme = 1;
                enemy--;
                passatempo(0,3);
            }
        }
        else if(tipo == 'stealthkill')
        {
            let probkill = (action.stealthkill * 0.1) + (action.kill * 0.1) + skills.stealth + lucky;
            if(agente.inventario[0] == 'Supressor' || agente.inventario[1] == 'Supressor' || agente.inventario[2] == 'Supressor' || agente.inventario[3] == 'Supressor')
            {
                probkill = probkill * 10;
            }
            probfail = Math.floor(Math.random() * 10);
            if(probkill >= probfail)
            {
                console.log("Inimigo eliminado com sucesso, você não foi detectado!");
                enemy--;
                action.stealthkill++;
                action.kill++;
                skills.Exp = skills.Exp + 1;
                passatempo(0,3);
            }
            else
            {
                console.log("Você foi visto matando, o alarme foi disparado!");
                acaounica.alarme = 1;
                enemy--;
                passatempo(0,4);
            }
        }
    }
    else
    {
        if(tipo == 'kill')
        {
            probkill = (action.kill * 0.1) + skills.forca + lucky;
            probfail = Math.floor(Math.random() * 10 + 3);
            if(agente.pos == 11)
            {
                probkill = 100;
            }
            if(probkill >= probfail)
            {
                console.log("Inimigo eliminado com sucesso, o barulho não foi ouvido!");
                enemy--;
                action.kill++;
                skills.Exp = skills.Exp + 0.5;
                passatempo(0,2);
            }
            else
            {
                console.log("O Inimigo detectou seu ataque, foram chamados reforços!");
                passatempo(0,3);
            }
        }
        else if(tipo == 'stealthkill')
        {
            probkill = (action.stealthkill * 0.1) + (action.kill * 0.1) + skills.stealth + lucky;
            if(agente.inventario[0] == 'Supressor' || agente.inventario[1] == 'Supressor' || agente.inventario[2] == 'Supressor' || agente.inventario[3] == 'Supressor')
            {
                probkill = probkill * 10;
            }
            probfail = Math.floor(Math.random() * 10 + 3);
            if(probkill >= probfail)
            {
                console.log("Inimigo eliminado com sucesso, você não foi detectado!");
                enemy--;
                action.stealthkill++;
                action.kill++;
                skills.Exp = skills.Exp + 1;
                passatempo(0,2);
            }
            else
            {
                console.log("Você foi visto matando, reforços foram chamados");
                acaounica.alarme = 1;
                enemy--;
                passatempo(0,3);
            }
        }
    }
}

//---------------------------------------------------------//--------------------------------------------------------//
//--------------------------------------------------------ENEMY------------------------------------------------------//
//---------------------------------------------------------//--------------------------------------------------------//

//-------------------------------------------------------------JOGO-------------------------------------------------------------//

startgame();