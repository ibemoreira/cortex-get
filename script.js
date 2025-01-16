console.log("Iniciando captura da tabela...");

const tabela = document.querySelector('#alertas'); // Seleciona a tabela pelo id 'alertas'
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Substitua pelo seu token de bot do Telegram
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; // Substitua pelo seu ID de chat

// Cria uma nova regra CSS para ocultar a 10ª coluna
let style = document.createElement('style');
document.head.appendChild(style);

// Adiciona a regra CSS à tag <style>
style.sheet.insertRule(`
  table tr td:nth-child(10), table tr th:nth-child(10) {
    display: none;
  }
`, style.sheet.cssRules.length);


if (tabela) {
    // Array para armazenar as linhas já capturadas
    let linhasCapturadas = [];
    

    // Função para capturar as linhas da tabela e exibir no console
    const capturarLinhas = () => {
        const linhas = tabela.querySelectorAll('tbody tr'); // Seleciona todas as linhas dentro do tbody
        linhas.forEach((linha, index) => {
            const celulas = linha.querySelectorAll('td'); // Seleciona todas as células (td) da linha
            if (celulas.length > 0) {
                // Extrai o conteúdo de cada célula da linha
                const dados = Array.from(celulas).map(celula => celula.innerText.trim());
                
                // Verifica se a linha já foi capturada
                if (!linhasCapturadas.includes(dados.join(' | '))) {
                    console.log(`Nova linha ${index + 1}:`, dados);
                    linhasCapturadas.push(dados.join(' | ')); // Adiciona a linha ao array de linhas capturadas
                    
                    // Envia a nova linha para o bot do Telegram
                    if (dados.length > 8) {
                        enviarParaTelegram(dados);
                    }
                }
            }
        });
    };

    // Função para enviar os dados para o Telegram
const enviarParaTelegram = (dados) => {
    // Remove o item "Detalhar" do array
    const dadosFiltrados = dados.filter((item) => item !== "Detalhar");

    // Extrai a latitude e longitude do campo correspondente (exemplo: "Lat: -15.6082Lng: -56.1357")
    //const coordenadas = dadosFiltrados[8];
    const coordenadas = dadosFiltrados.length > 8 ? dadosFiltrados[8] : '';
    coordenadas.replace(/(\r\n|\n|\r)/gm,"");
    console.log(coordenadas);
    //const matchCoordenadas = coordenadas.match(/Lat:\s*([-\d.]+)Lng:\s*([-\d.]+)/s);
    const matchCoordenadas = coordenadas.match(/Lat:\s*([-\d.]+)Lng:\s*([-\d.]+)[\s\S]?/s);
    console.log(matchCoordenadas);
    let linkMaps = '';
    if (matchCoordenadas) {
        const latitude = matchCoordenadas[1];
        const longitude = matchCoordenadas[2];
        linkMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    // Formata a mensagem para o Telegram
    const mensagem = `
🚨 **Novo Alerta** 🚨
🕒 Data e Hora: ${dadosFiltrados[0]}
🚗 Placa: ${dadosFiltrados[1]}
🚘 Veículo: ${dadosFiltrados[2]}
🔎 Chassi: ${dadosFiltrados[3]}
📋 Situação: ${dadosFiltrados[4]}
📍 Localização: ${dadosFiltrados[5]}
🏙️ Cidade: ${dadosFiltrados[6]}
🗺️ Estado: ${dadosFiltrados[7]}
🌐 Coordenadas: [Ver no Google Maps](${linkMaps})
    `.trim();

    // Envia a mensagem para o Telegram
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensagem, // Texto que será enviado
            parse_mode: "Markdown", // Permite formatação com Markdown
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mensagem enviada para o Telegram:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem para o Telegram:', error);
    });
};


    // Captura a tabela inicialmente
    capturarLinhas();

    // Configura o MutationObserver para monitorar mudanças na tabela
    const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            // Verifica se houve adição de novas linhas
            if (mutation.type === 'childList') {
                // Se foram adicionadas novas linhas, chama a função para capturar as novas linhas
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === 'TR') { // Confirma que é uma linha de tabela
                            console.log('Nova linha adicionada!');
                            capturarLinhas(); // Captura novamente as linhas da tabela
                        }
                    });
                }
            }
        });
    });

    // Configura o MutationObserver para observar o tbody da tabela
    observer.observe(tabela.querySelector('tbody'), {
        childList: true, // Observa adições e remoções de filhos
        subtree: true     // Observa em toda a árvore de elementos dentro do tbody
    });
} else {
    console.log("Tabela não encontrada!");
}
