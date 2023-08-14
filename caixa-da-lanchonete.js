//Arrays globais para a manipulação de dados
const codigosCardapio = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];
const formasDepagamento = ["debito", "credito", "dinheiro"];
const itensPedidos = [];
const valorItensPedidos =[];
const pedidoSalvo = [];
let valorDoPagamento = 0; //variavel para somar valor total da compra 

//Função para receber o codigo do item. Salvar o codigo e preço no seu respectivo array. Digita código e preço na tela
function itensSelecionados(){
    //manipulação do DOM
    let inputCodigoDoItem = document.getElementById('inputCodigoDoItem');
    let outputCodigoInformado = document.getElementById("outputCodigoInformado");
    
    let codigoDoItem = inputCodigoDoItem.value;

    //verifica campos digitados
    if(!codigosCardapio.includes(codigoDoItem)){
        alert('Informe corretamente o código descrito no cardápio')
        inputCodigoDoItem.focus();
        inputCodigoDoItem.value = "";
        return;
    } else {
        let valorItem = 0;

        switch(codigoDoItem){
            case "cafe":
                valorItem = 3.00;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            case "chantily":
                if(!itensPedidos.includes("cafe")){
                    alert("É preciso ter café para adicionar o chantily");
                } else {
                    valorItem = 1.50;
                    itensPedidos.push(codigoDoItem);
                    valorItensPedidos.push(valorItem);
                };
                break;
            case "suco":
                valorItem = 6.20;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            case "sanduiche":
                valorItem = 6.50;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            case "queijo":
                if(!itensPedidos.includes("sanduiche")){
                    alert("É preciso ter sanduíche para adicionar o queijo");
                } else {
                    valorItem = 2.00;
                    itensPedidos.push(codigoDoItem);
                    valorItensPedidos.push(valorItem);
                };
                break;
            case "salgado":
                valorItem = 1.75;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            case "combo1":
                valorItem = 9.50;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            case "combo2":
                valorItem = 7.50;
                itensPedidos.push(codigoDoItem);
                valorItensPedidos.push(valorItem);
                break;
            default:
                break;
        };

        let exibeItensAdicionados = "";
        for(i = 0; i < itensPedidos.length; i++){
            exibeItensAdicionados += itensPedidos[i] + " - R$" + valorItensPedidos[i].toFixed(2) + "\n";
        };
        outputCodigoInformado.textContent = exibeItensAdicionados;

        //limpa os campos de digitação
        inputCodigoDoItem.value = "";
        inputCodigoDoItem.focus();
    };
};
const botaoAdicionar = document.getElementById('btAdicionarItem');
botaoAdicionar.addEventListener('click', itensSelecionados);

//Função salva os codigos digitados em outro array(pedidoSalvo), e a soma do valor total já e feita. 
function salvarPedido(){
    let outputCodigoInformado = document.getElementById("outputCodigoInformado");
    let somaDosValores = 0;

    if(itensPedidos.length == 0){
        alert("Informe os itens para depois salvar o pedido...");
        inputCodigoDoItem.focus();
        return;
    } else {
        //laço de repetição para transferir os itens do array (itensPedidos) para o (pedidoSalvo)
        for(i = itensPedidos.length; i = itensPedidos.length; i--){
            let ultimoItem = itensPedidos.pop();
            pedidoSalvo.push(ultimoItem);
            somaDosValores += valorItensPedidos.pop();
        };

        outputCodigoInformado.textContent = "Pedido salvo com sucesso!!!";
    };

    valorDoPagamento += somaDosValores;
};
const botaoSalvar = document.getElementById("salvarPedido");
botaoSalvar.addEventListener('click', salvarPedido);

//função para excluir itens digitados.
function excluirItens(){
    if(itensPedidos.length == 0){
        alert("Nem um item informado...");
        inputCodigoDoItem.focus();
        return;
    } else {
        let outputCodigoInformado = document.getElementById("outputCodigoInformado");
        
        itensPedidos.splice(0);
        valorItensPedidos.splice(0);

        outputCodigoInformado.textContent = "Itens excluídos com sucesso...";
    };
};
const botaoExcluir = document.getElementById("excluirItens");
botaoExcluir.addEventListener('click', excluirItens);

//calculando o pagamento.
function calcularValorDaCompra(){
    //Manipulação do DOM
    let inputPagamento = document.getElementById("inputPagamento");
    let outputDescricaoFormaDePagamento = document.getElementById("outputDescricaoFormaDePagamento");
    let outputValorTotal = document.getElementById("outputValorTotal");
    let pagamento = inputPagamento.value;

    //verifica o texto digitado.
    if(!formasDepagamento.includes(pagamento)){
        alert("Forma de pagamento inválida")
        inputPagamento.focus();
        return
    } else {

        //Cartão: acrescimo de 3% - dinheiro: desconto de 5%;
        let pagamentoNoCartao = 0;
        let pagamentoEmDinheiro = 0;

        inputPagamento.value = "";

        //Faz o calculo e imprime na tela a forma de pagamento e o valor a ser pago.
        switch(pagamento){
            case "debito":
                pagamentoNoCartao = valorDoPagamento + (valorDoPagamento * 0.03);
                outputDescricaoFormaDePagamento.textContent = "Valor do pedido - R$" + valorDoPagamento.toFixed(2) + "\n- Pagamento no debito (acrescimo de 3%)";
                outputValorTotal.textContent = "Total = R$" + pagamentoNoCartao.toFixed(2);
                break;
            case "credito":
                pagamentoNoCartao = valorDoPagamento + (valorDoPagamento * 0.03);
                outputDescricaoFormaDePagamento.textContent = "Valor do pedido - R$" + valorDoPagamento.toFixed(2) + "\n- Pagamento no crédito (acrescimo de 3%)";
                outputValorTotal.textContent = "Total = R$" + pagamentoNoCartao.toFixed(2);
                break;
            case "dinheiro":
                pagamentoEmDinheiro = valorDoPagamento - (valorDoPagamento * 0.05);
                outputDescricaoFormaDePagamento.textContent = "Valor do pedido - R$" + valorDoPagamento.toFixed(2) + "\n- Pagamento no dinheiro (desconto de 5%)";
                outputValorTotal.textContent = "Total = R$" + pagamentoEmDinheiro.toFixed(2);
                break;
            default:
            break;
        };
    };
};
let btConfirmarPagamento = document.getElementById("btConfirmarPagamento");
btConfirmarPagamento.addEventListener('click', calcularValorDaCompra);

//Finalizando o pagamento, esvaziando todos os arryas, zerando o valor a ser pago, e informa por alert que já pode ser feito outro pedido.
function finalizarPagamento(){
    if(pedidoSalvo.length == false){
        alert("Nem um pedido cadastrado para finalizar...");
    } else {
        pedidoSalvo.splice(0);

        alert("Pagamento aceito!!!");
        alert("Caixa pronto para receber o próximo pedido.")
        
        outputCodigoInformado.textContent = "";
        outputDescricaoFormaDePagamento.textContent = "";
        outputValorTotal.textContent = "";

        valorDoPagamento = 0;
    };
};
let btFinalizarPagamento = document.getElementById("btFinalizarPagamento");
btFinalizarPagamento.addEventListener('click', finalizarPagamento);