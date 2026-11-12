# Estudo em loop — YouTube + Notion

Gerador de links e player para estudar trechos de vídeos, com repetição opcional. HTML, CSS e JavaScript sem instalação, build ou chave de API.

## Publicar no GitHub Pages

1. Coloque os arquivos desta pasta na raiz do repositório `SheltonFarias/youtube-player`, na branch `main` (não coloque a pasta inteira dentro de outra pasta).
2. No repositório, abra **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch**; escolha **main** e **/ (root)** e clique em **Save**.
4. Aguarde a publicação. A URL esperada é `https://sheltonfarias.github.io/youtube-player/`. Confirme a URL exibida pelo próprio GitHub em Pages.

## Criar um trecho e usar no Notion

1. Abra a página inicial publicada e cole um link ou ID do YouTube.
2. Dê um nome à técnica, se desejar. Defina início e fim, por exemplo `2:30` e `3:10`.
3. Deixe **Repetir o trecho automaticamente** marcado e clique em **Gerar link para o Notion**.
4. Use **Abrir player** para testar e depois **Copiar link**.
5. No Notion, abra a anotação da técnica. Em uma linha vazia, digite `/embed` e escolha **Incorporar**.
6. Cole o link do player e confirme **Incorporar link**. Redimensione o bloco para exibir o vídeo e os botões; use pelo menos 200 px de altura para o vídeo, idealmente um bloco com cerca de 650 px de altura.
7. Clique em **Reproduzir trecho**. O player retorna ao início quando atinge o fim. Desmarque **Repetir trecho** para parar no fim.

Use uma página por técnica e inclua objetivo, pontos de atenção e suas anotações abaixo do player. Para outro trecho, gere e incorpore outro link; não precisa editar o código nem republicar. Alterar a caixa de repetição dentro do player vale apenas para a sessão: para salvar outra configuração no Notion, gere um novo link e substitua a incorporação.

Exemplo de formato (a disponibilidade e o conteúdo do vídeo não foram verificados):

`https://sheltonfarias.github.io/youtube-player/player.html?video=Vu4oXIRzx7w&start=150&end=190&loop=1&title=Knee+Cut`

Parâmetros: `video` = ID do vídeo; `start` e `end` = segundos; `loop=1` = repetir, `loop=0` = parar; `title` = título opcional.

## Limitações

- O player usa uma interface simplificada, sem os controles internos do YouTube. Use os botões abaixo do vídeo. O logo, o título e outras sobreposições do YouTube ainda podem aparecer; `rel=0` restringe sugestões ao mesmo canal, sem eliminá-las.

- A reprodução começa após clique. Navegadores e o Notion podem restringir reprodução, cookies ou incorporações; se necessário, abra o player em outra aba.
- Vídeos privados, removidos, com restrição de idade ou com incorporação desativada podem não funcionar. O link **Abrir no YouTube** é uma alternativa, sem o loop personalizado.
- O limite do trecho é verificado por JavaScript a cada 100 ms; não é edição precisa por quadro e pode atrasar em abas inativas ou aparelhos ocupados.
- Não há sincronização com uma base de dados do Notion: o Notion exibe a página hospedada. Não precisa de token ou integração do Notion.
- O site e os parâmetros dos links publicados são públicos. O player conecta o navegador ao YouTube. Não inclua informações privadas no título.
- Não abra os arquivos diretamente via `file://`. Para testar localmente, execute `python -m http.server 8000` nesta pasta e abra `http://localhost:8000`.

## Verificação

`npm test` verifica interpretação de links e tempos. Teste também um vídeo que permita incorporação no navegador e dentro do Notion após a publicação.

Referências: [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [incorporações no Notion](https://www.notion.com/help/embed-and-connect-other-apps).
