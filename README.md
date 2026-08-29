# Portfólio — Caio Leão

Portfólio pessoal de Caio Leão, Analista de Dados / Analytics Engineer, com projetos de dados, Business Intelligence, ETL e análise preditiva.

**Site publicado:** https://caio-analytics.github.io/Portfolio-Caio-Leao/

## Sobre

Atuo com Engenharia de Dados e Business Intelligence, construindo o caminho completo de um pedido em palavras até o dashboard funcionando: levantamento de requisito, estruturação de dado em camadas, automação de ingestão e entrega visual. Hoje sustento dashboards oficiais em Power BI usados por mais de 300 pessoas, com pipeline de dados em produção.

Mais contexto e a trajetória completa estão no site publicado.

## Projetos em destaque

### [Recon](https://github.com/Caio-Analytics/Recon)
Ferramenta de linha de comando em Python que perfila arquivos de dados antes da análise: infere semântica de coluna mesmo com nome abreviado, roda estatística avançada (Shapiro-Wilk, qui-quadrado, correlação de Pearson/Spearman, seleção de distribuição por AIC, ADF e Ljung-Box), cruza tabelas para identificar fato e dimensão e monta o diagrama ER, detecta CPF/CNPJ com validação de dígito verificador e mascara antes de expor, e sugere análises com código pandas e SQL prontos. Só regras determinísticas, sem modelo de IA. 306 testes automatizados.

### [Bateia](https://github.com/Caio-Analytics/bateia)
Pipeline de dados e dashboard analítico sobre a mineração brasileira, sobre dados 100% reais e públicos da ANM (Agência Nacional de Mineração, via Relatório Anual de Lavra), cobrindo 2010 a 2025 em duas bases (Produção Bruta e Produção Beneficiada), cerca de 10.300 registros combinados. Pipeline completo em camadas (Bronze, Silver, Gold), cruzamento das duas bases por SQL pra quantificar o valor que o beneficiamento agrega ao minério bruto, e dashboard executivo interativo num único arquivo HTML autocontido, sem backend. Testes automatizados e integração contínua via GitHub Actions.

## Estrutura do repositório

```
.
├── index.html                    # página principal do portfólio
├── assets/
│   ├── css/
│   │   └── style.css             # estilos
│   ├── js/
│   │   └── script.js             # interações (revelação ao rolar, contadores, lightbox)
│   └── images/
│       ├── recon/                # screenshots do projeto Recon
│       └── bateia/               # screenshots do projeto Bateia
└── README.md
```

`index.html` fica na raiz do repositório porque é esse o arquivo que o GitHub Pages serve como ponto de entrada do site.

## Stack

HTML, CSS e JavaScript puros, sem framework, publicado via GitHub Pages.

## Contato

- LinkedIn: [linkedin.com/in/caio-le](https://www.linkedin.com/in/caio-le)
- GitHub: [github.com/Caio-Analytics](https://github.com/Caio-Analytics)
- E-mail: caiolmnnml@proton.me

## Licença

Todos os direitos reservados. Veja [LICENSE](LICENSE) para detalhes.