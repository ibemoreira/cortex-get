# Extensão de Alertas Cortex

## Desenvolvedor
Wilberte Santos

## Descrição
A Extensão de Alertas Cortex é uma ferramenta para captura de alertas do sistema Cortex. Ela analisa e envia informações específicas para um bot do Telegram, permitindo o monitoramento em tempo real. **Todos os dados são protegidos e este é um trabalho acadêmico com fins educacionais**.

## Funcionalidades
- Captura linhas de uma tabela na página alvo.
- Extrai e formata dados relevantes.
- Envia os dados formatados para um chat do Telegram.

## Exemplo de Mensagem no Telegram
<code style="background-color: #F5F5DC; padding: 10px; border-radius: 10px;">
 &lt;pre&gt;
**Novo Alerta**
🚨🕒 Data e Hora: 17/11/2022 14:30
🚗 Placa: ABC-1234`
🚘 Veículo: Honda Civic
🔎 Chassi: 9BW0H54U22S020001
📋 Situação: Furto
📍 Localização: Rua da Praia, 123 - Centro
🏙️ Cidade: Vitória🗺️ Estado: Espírito Santo
🌐 Coordenadas: [Ver no Google Maps](https://www.google.com/maps/@-20.320567,-40.2921897,15z)
&lt;/pre&gt;
</code>

## Arquivos Principais
- **`index.html`**: Página principal com formulário e ligação ao script.
- **`script.js`**: Contém as funções para captura de dados e envio para o Telegram.
- **`style.css`**: Estilos básicos para o formulário.
- **`manifest.json`**: Arquivo de configuração da extensão do Chrome.

## Instalação
1. Baixe o repositório e descompacte-o em um diretório.
2. Abra o Google Chrome e acesse a página `chrome://extensions/`.
3. Ative o Modo de Desenvolvedor (Developer mode).
4. Clique em "Carregar sem compactação" e selecione o diretório que contém o repositório.

## Uso
1. Acesse a página suportada pelo script.
2. Os alertas serão capturados e enviados automaticamente ao Telegram.

## Contato
Caso tenha dúvidas, entre em contato com Wilberte Santos.

