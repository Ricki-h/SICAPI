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