# SICAPI

---

## Sobre
O SICAPI é a API do SICAR, um sistema web feito para fins academicos a fim de apresentar no evento do IFRN Campus Natal Zona Norte, Interligando Saberes

---

## Rotas

### /usuarios
GETs
- /all - Pega todos os Usuários (somente admin de nível 4+)
- /:id - Pega 1 usuário (somente admin de nível 4+)
- /me - Pega o usuário da sessão (necessário login)

POSTs
- /create - Cria usuário (para criar admins é necessário ser um admin de nível 5)
- /login
    - /comum - loga usuário comum
    - /cadarca - Loga Usuário CadArca
    - /admin - Loga Usuário administrador~

PUTs
- /update - Atualiza dados de texto do usuário da sessão
- /update/icon - Atualiza icon do usuário da sessão

DELETEs
- /delete - Deleta o usuário da sessão
- /delete/:id - Deleta outro usuário (somente admin de nível 4+)

### /auxilios
GETs
- /all - Lista todos os auxílios
- /:id - Lista um auxílio
- /solicitacoes
    - /meus - Lista solicitações de auxílio do usuário (necessário login)
    - /gerencias - Lista solicitações gerenciadas pelo administrador (somente admin de nível 2+)
        - /:id - Lista uma solicitação gerenciada pelo administrador (somente admin de nível 2+)
    - /:id - Lista uma solicitação de auxílio do usuário (necessário login)

POSTs
- /criar - Cria auxílio (somente admin de nível 3+)
- /solicitar - Cria solicitação de auxílio (necessário login)

PUTs
- /update/:id - Atualiza um auxílio (somente admin de nível 2+)
- /status/:id - Atualiza status de um auxílio (somente admin de nível 2+)

DELETE
- /delete/:id - Deleta um auxílio (somente admin de nível 3+)

### /servicos
GETs
- /categorias
    - /all - Lista todas as categorias de serviços
    - /:id - lista uma categoria de serviço
- /all - Lista todos os serviços
- /agendamentos
    - /meus - Lista agendamentos de serviços do usuário (login necessário)
        - /:id - Lista um agendamento de serviço do usuário (login necessário)
    - /gerencias - Lista os agendamentos de serviços gerenciados pelo administrador (somente admin de nível 2+)
        - /:id - Lista um agendamento de serviço gerenciado pelo administrador (somente admin de nível 2+)
- /:id - Lista um serviço 

POSTs
- /categorias/criar - Cria categoria de serviços (somente admin de nível 3+)
- /criar - Cria serviço (somente admin de nível 3+)
- /agendamentos/agendar - Realiza agendamento (login necessário)

PUTs
- /categorias/edit
    - /:id - Altera uma categoria de serviço (somente admin de nível 3+)
    - /icon/:id - Modifica ícone de uma categoria de serviço (somente admin de nível 3+)
- /edit/:id - Altera um serviço (somente admin de nível 3+)
- /agendamentos/status/:id - Atualiza status de um agendamento (somente admin de nível 2+)

DELETEs
- /categorias/delete/:id - Deleta um categoria de serviço (somente admin de nível 4+)
- /delete/:id - Deleta um serviço (somente admin de nível 4+)

### /denuncias
GETs
- /all - Lista todas as denúncias
- /minhas - Lista todas as denúncias do usuário (login necessário)
- /gerenciadas - Lista todas as denúncias gerenciadas pelo administrador (só pode ser acessado pelo admin)
- /:id - Lista uma denúncia

POST
- /create - Cria denúncia (login necessário)

PUT
- /update/:id - Atualiza denúncia (somente admin nível 2+)

DELETE
- /delete/:id - Deleta denúncia (somente admin nível 3+)

### /ongs
GETs
- /all - Lista todas as ongs
- /:id - Lista uma ong

POST
- /create - Cria uma ong (somente admin nível 1+)

PUT
- /update/:id - Atualiza dados da ong (somente admin nível 1+)

DELETE
- /delete/:id - Deleta dados da ong (somente admin nível 1+)

### /abrigos
GETs
- /all - Lista todos os abrigos
- /:id - Lista um abrigo específico

POST
- /create - Cria um abrigo

PUT
- /update/:id - Atualiza um abrigo

DELETE
- /delete/:id - Deleta um abrigo

### /cursos
GETs
- /all - Lista todos os cursos
- /meuscursos - Lista todos os cursos que o usuário participa (login necessário)
- /:id/inscritos/ - Apresenta a quantidade de inscritos no curso
- /:id - Lista os dados de um curso

POSTs
- /create - Cria um curso (somente admin nível 1+)
- /inscrever - Usuário se inscreve em um curso (login necessário)

PUTs
- /update/:id - Atualiza um curso (somente admin nível 1+)
- /update/files/:id - Atualiza arquivos do curso (somente admin nível 1+)

DELETE
- /delete/:id - Deleta dados de um curso (somente admin nível 1+)

### /professores
GETs
- /all - Lista todos os professores
- /:id - Mostra dados de um professor

POST
- /create - Cria um professor (somente admin nível 1+)

PUTs
- /update/:id - Atualiza os dados de um professor (somente admin nível 1+)
- /update/icon/:id - Atualiza ícone de um professor (somente admin nível 1+)
 
DELETE
- /delete/:id - Deleta os dados de um professor (somente admin nível 1+)

### /tipoemprego
GETs
- /all - Lista todos os tipos de emprego
- /:id - Lista um tipo de emprego

POST
- /create - Cria um tipo de emprego (somente admin nível 2+)

PUTs
- /update/:id - Atualiza os dados de um tipo de emprego (somente admin nível 2+)
- /update/icon/:id - Atualiza o ícone de um tipo de emprego (somente admin nível 2+)

DELETE
- /delete/:id - Deleta dados de um tipo de emprego (somente admin nível 2+)

### /empregocategoria
GETs
- /all - Lista todas as categorias de emprego
- /:id - Lista uma categoria de emprego

POST
- /create - Cria uma categoria de emprego (somente admin nível 2+)

PUTs
- /update/:id - Atualiza os dados de uma categoria de emprego (somente admin nível 2+)
- /update/icon/:id - Atualiza o ícone de uma categoria de emprego (somente admin nível 2+)

DELETE
- /delete/:id - Deleta dados de uma categoria de emprego (somente admin nível 2+)

### /empregooportunidade
GETs
- /all - Lista todas as oportunidades de emprego
- /:id - Lista uma oportunidade de emprego

POST
- /create - Cria uma oportunidade de emprego (somente admin nível 2+)

PUTs
- /update/:id - Atualiza os dados de uma oportunidade de emprego (somente admin nível 2+)
- /update/icon/:id - Atualiza o ícone de uma oportunidade de emprego (somente admin nível 2+)

DELETE
- /delete/:id - Deleta dados de uma oportunidade de emprego (somente admin nível 2+)

### /inscricao
GETs
- / - Lista todas as inscrições de emprego
- /:id - Lista uma inscrição de emprego

POST
- /inscrever - Realiza inscrição em um emprego

PUT
- /:id - Atualiza dados de uma inscrição em um emprego

DELETE
- /:id - Deleta dados de uma inscrição em um emprego

### /blog
GETs
- / - Lista todas as postagens do blog
- /:id - Lista uma postagem do blog

POST
- /create - Cria uma postagem do blog (precisa ser admin)

PUT
- /:id - Atualiza dados de uma postagem do blog (precisa ser admin)

DELETE
- /:id - Deleta dados de uma postagem do blog (precisa ser admin)