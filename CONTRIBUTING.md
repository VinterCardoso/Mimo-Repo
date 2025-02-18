# Indíce

- [Padrões de Branch](#padrões-de-branch)
- [Mensagens de commit](#mensagens-de-commit)
- [Workflow](#workflow)

# Padrões de branch
 O padrão de branch a ser seguido é lowercase_snake_case.\
 Cada branch deve ser criada a partir da master. \
 A branch master é protegida, então somente pull requests para master poderão atualizá-la.

# Mensagens de commit
Os commits devem seguir o padrão "tipo(origem): mensagem do commit"
- Tipos sugeridos:
    - feat: Implementação de código
    - fix: Correção de bug ou alteração que modifica algo que já foi criado
    - doc: Documentação
- Origem:
    - back: Quando o que foi desenvolvido foi feito no back-end
    - front: Quando o que foi desenvolvido foi feito no front-end

# Workflow

- Verificar issues disponíveis no Project
- Crie sua branch a partir da master com o nome da issue atribuida a você.
- Ao terminar não esqueça de criar o pull request.