# SICAPI

---

## Sobre
O SICAPI é a API do SICAR, um sistema web feito para fins academicos a fim de apresentar no evento do IFRN Campus Natal Zona Norte, Interligando Saberes

---

## Rotas

### /usuários
GETs
- /all - Pega todos os Usuários (somente admin de nivel 4+)
- /:id - Pega 1 usuário (somente admin de nivel 4+)
- /me - Pega o usuário da sessão (necessário login)

POSTs
- /create - Cria usuário (para criar admins é necessário ser um admin de nivel 5)
- /login
    - /comum - loga usuário comum
    - /cadarca - Loga Usuário CadArca
    - /admin - Loga Usuário administrador~

PUTs
- /update - Atualiza dados de texto do usuário da sessão
- /update/icon - Atualiza icon do usuário da sessão

DELETEs
- /delete - Deleta o usuário da sessão
- /delete/:id - Deleta outro usuário (somente admin de nivel 4+)
