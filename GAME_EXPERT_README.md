# Game Expert AI

Uma IA especialista em jogos com conhecimento profundo sobre todos os tipos de jogos — mobile, PC, console, indie, AAA, estratégia, RPG, FPS, esportes, sandbox, retrô e lançamentos recentes.

## 🎮 Funcionalidades

### Consulta Inteligente
- **Respostas Especializadas**: Análises detalhadas sobre qualquer aspecto de jogos
- **Níveis de Expertise**: Adapta respostas para iniciante, intermediário, avançado ou profissional
- **Categorias Específicas**: Foco em jogos competitivos, RPG, FPS, estratégia, mobile, indie/retrô
- **Contexto Inteligente**: Interpreta prompts longos e complexos com precisão

### Análise de Jogos
- **Métricas Detalhadas**: Avaliação completa de jogos populares
- **Requisitos de Sistema**: Informações sobre hardware necessário
- **Estatísticas**: Número de jogadores, scores, tempo de jogo
- **Pontos Fortes/Fracos**: Análise balanceada de cada jogo

### Notícias e Tendências
- **Atualizações em Tempo Real**: Notícias quentes sobre o mundo dos jogos
- **Tendências de Popularidade**: Jogos em alta no momento
- **Informações de Patches**: Atualizações e balanceamentos recentes

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15 com App Router
- **Estilização**: Tailwind CSS com shadcn/ui
- **Backend API**: Next.js API Routes
- **IA**: ZAI SDK para processamento de linguagem natural
- **Tipagem**: TypeScript 5
- **Componentes**: Radix UI + Lucide Icons

## 🎯 Como Usar

1. **Configurar Nível**: Escolha seu nível de conhecimento (iniciante → profissional)
2. **Selecionar Categoria**: Foque em uma área específica ou use "Todas"
3. **Fazer Pergunta**: Digite sua dúvida sobre jogos
4. **Explorar Widgets**: Use os widgets de análise e notícias

## 💡 Exemplos de Uso

### Jogos Competitivos
- "Quais são as melhores estratégias para subir de elo no League of Legends?"
- "Como melhorar meu aim no Valorant?"

### RPG e MMORPG
- "Qual a melhor build para mago em Elden Ring?"
- "Como progredir rápido em Final Fantasy XIV?"

### Análise Técnica
- "Quais são os requisitos mínimos para rodar Cyberpunk 2077?"
- "Qual a diferença entre Dark Souls 3 e Elden Ring?"

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx              # Layout da aplicação
│   └── api/
│       └── game-expert/
│           └── route.ts        # API de processamento
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   ├── GameNewsWidget.tsx      # Widget de notícias
│   └── GameAnalysisWidget.tsx  # Widget de análise
└── lib/
    ├── utils.ts                # Utilitários
    └── db.ts                   # Conexão com banco
```

## 🔧 Configuração

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Executar em Desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Verificar Código**:
   ```bash
   npm run lint
   ```

## 🎨 Design System

- **Cores**: Tema escuro com acentos roxos
- **Tipografia**: Hierarquia clara e legível
- **Responsivo**: Mobile-first design
- **Acessibilidade**: Componentes ARIA-compliant
- **Animações**: Transições sutis com Framer Motion

## 🤖 Inteligência Artificial

A Game Expert AI utiliza o ZAI SDK para fornecer:

- **Conhecimento Abrangente**: Acesso a informações atualizadas sobre jogos
- **Análise Contextual**: Compreensão profunda do contexto do usuário
- **Respostas Estruturadas**: Informações organizadas e fáceis de entender
- **Adaptação**: Ajuste automático do nível de detalhe

## 📊 Performance

- **Build Otimizado**: Next.js 15 com otimizações automáticas
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Cache Inteligente**: Cache de respostas para melhor performance
- **Responsive Design**: Adaptável a todos os tamanhos de tela

## 🛡️ Segurança

- **Validação de Input**: Sanitização de todas as entradas
- **Rate Limiting**: Proteção contra abuso da API
- **CORS Configurado**: Acesso controlado entre origens
- **Error Handling**: Tratamento robusto de erros

## 🚀 Deploy

A aplicação está configurada para deploy em plataformas compatíveis com Next.js:

1. **Build**: `npm run build`
2. **Start**: `npm start`
3. **Porta**: 3000 (configurável via environment)

## 📈 Roadmap Futuro

- [ ] Sistema de autenticação com NextAuth
- [ ] Histórico de conversas
- [ ] Integração com APIs de jogos (Steam, Twitch)
- [ ] Sistema de recomendações personalizadas
- [ ] Modo offline com cache local
- [ ] Integração com voice chat

## 📝 Licença

Este projeto é para demonstração educacional.

---

**Game Expert AI** - Sua especialista em jogos 🎮✨