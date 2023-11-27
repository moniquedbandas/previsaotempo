const chaveDaApi = "f0967eeccb2e48fda43211949232411";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener('click', async () => {
    const cidade = document.getElementById("input-busca").value;
    if (!cidade) {
        return;
    }
    const dados = await buscarDadosDaCidade(cidade);

    if (dados) {
        preencherDadosNaTela(dados, cidade);
    }
})

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;
    // template String
    const resposta = await fetch(apiUrl);
    if (resposta.status !== 200) return;

    const dados = resposta.json();
    return dados;
}
function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const horaLocal = dados.location.localtime;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = `${temperatura} ºC`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("hora-local").textContent = horaLocal;
    document.getElementById("umidade").textContent = `${umidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/H`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}