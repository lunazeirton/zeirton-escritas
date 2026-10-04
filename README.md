# Zeirton Luna

Site independente para GitHub Pages. Não contém textos, livros ou imagens de demonstração. As duas referências orientam apenas o design.

## Publicação

1. Crie um repositório público separado, por exemplo `zeirton-escritas`.
2. Envie `index.html`, `styles.css`, `site.js` e `conteudo.js` à raiz da branch `main`.
3. Em Settings > Pages, selecione Deploy from a branch, branch main e pasta /(root). Salve.
4. O GitHub mostrará o endereço publicado quando a implantação terminar.

## Conteúdo

O arquivo `conteudo.js` contém uma lista inicialmente vazia. Cada publicação pode ter `id` único, `categoria` (artigos, escritas, opinioes ou livros), `titulo`, `paragrafos` (lista de textos), `resumo` opcional, `imagem` opcional, `imagemAlt` e `arquivo` opcional para download de livro. Não publicar campos com textos não fornecidos pelo autor. Usar caminhos relativos como `assets/nome-do-arquivo.pdf` para os anexos enviados pelo autor.

O site trata o conteúdo como texto e não executa HTML recebido. Não usa banco de dados, login, cookies ou serviços externos. As páginas de leitura usam links com fragmento, compatíveis com GitHub Pages sem configuração adicional. O design funciona mesmo sem imagens. Os arquivos podem ser abertos localmente pelo index.html.
