import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const GAME_EXPERT_SYSTEM_PROMPT = `
# Game Expert AI - Especialista em Jogos

Você é uma IA especialista em jogos com conhecimento profundo e atualizado sobre todos os tipos de jogos. Sua especialidade inclui:

## Áreas de Conhecimento:
- **Jogos Competitivos**: eSports, metas, estratégias competitivas
- **RPG/MMORPG**: Builds, lore, personagens, progressão
- **FPS**: Aim, mapas, armas, táticas
- **Estratégia**: Build orders, gerenciamento, táticas
- **Jogos Mobile**: Gacha, idle games, competitivo mobile
- **Jogos Indie/Retrô**: Clássicos, independentes, nostalgia
- **Jogos AAA**: Lançamentos, gráficos, inovações
- **Hardware**: Requisitos, configurações ideais
- **Game Design**: Mecânicas, sistemas, balanceamento

## Estilo de Resposta:
- **Claro e Estruturado**: Use headings, listas e formatação
- **Profissional**: Linguagem adequada ao nível solicitado
- **Completo**: Forneça detalhes e exemplos práticos
- **Atualizado**: Informações recentes sobre patches e metas
- **Técnico**: Explicações detalhadas quando solicitado

## Níveis de Expertise:
- **Iniciante**: Explicações básicas, passo a passo
- **Intermediário**: Conceitos médios, estratégias comuns
- **Avançado**: Técnicas complexas, otimização
- **Profissional**: Nível competitivo, análises profundas

## Formato da Resposta:
1. **Resposta Direta**: Comece com a resposta principal
2. **Detalhes**: Explicações técnicas e estratégicas
3. **Exemplos Práticos**: Situações reais do jogo
4. **Dicas Adicionais**: Informações extras úteis
5. **Considerações**: Limitações ou alternativas

Sempre adapte o nível de detalhe ao expertise solicitado pelo usuário e forneça informações precisas e atualizadas.
`

export async function POST(request: NextRequest) {
  try {
    const { message, category, expertiseLevel } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      )
    }

    // Criar instância do ZAI
    const zai = await ZAI.create()

    // Construir o prompt com base nas configurações do usuário
    let contextualPrompt = GAME_EXPERT_SYSTEM_PROMPT

    if (category && category !== 'todos') {
      contextualPrompt += `\n\n## Foco Específico: ${category}\nConcentre-se especialmente em aspectos relacionados a ${category}.`
    }

    if (expertiseLevel) {
      contextualPrompt += `\n\n## Nível de Expertise Solicitado: ${expertiseLevel}\nAdapte suas explicações para o nível ${expertiseLevel}.`
    }

    contextualPrompt += `\n\n## Pergunta do Usuário:\n${message}`

    // Fazer a chamada à API
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: contextualPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('Resposta inválida da API')
    }

    // Detectar categoria principal da resposta
    let detectedCategory = category
    if (!detectedCategory || detectedCategory === 'todos') {
      // Lógica simples para detectar categoria baseada em palavras-chave
      const lowerMessage = message.toLowerCase()
      if (lowerMessage.includes('lol') || lowerMessage.includes('league') || lowerMessage.includes('elo') || 
          lowerMessage.includes('ranked') || lowerMessage.includes('competitive')) {
        detectedCategory = 'Jogos Competitivos'
      } else if (lowerMessage.includes('rpg') || lowerMessage.includes('build') || lowerMessage.includes('character') ||
                 lowerMessage.includes('level') || lowerMessage.includes('skill')) {
        detectedCategory = 'RPG e MMORPG'
      } else if (lowerMessage.includes('fps') || lowerMessage.includes('aim') || lowerMessage.includes('weapon') ||
                 lowerMessage.includes('shoot') || lowerMessage.includes('headshot')) {
        detectedCategory = 'FPS e Tiro'
      } else if (lowerMessage.includes('strategy') || lowerMessage.includes('tactics') || lowerMessage.includes('build order')) {
        detectedCategory = 'Estratégia'
      } else if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('gacha')) {
        detectedCategory = 'Jogos Mobile'
      } else if (lowerMessage.includes('indie') || lowerMessage.includes('retro') || lowerMessage.includes('classic')) {
        detectedCategory = 'Indie e Retrô'
      }
    }

    return NextResponse.json({
      response: response,
      category: detectedCategory || 'Geral'
    })

  } catch (error) {
    console.error('Erro na API Game Expert:', error)
    
    // Retornar resposta de erro mais informativa
    return NextResponse.json(
      { 
        error: 'Erro ao processar sua pergunta',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Game Expert AI API está funcionando!',
    endpoints: {
      'POST /api/game-expert': 'Envie perguntas sobre jogos',
      parameters: {
        message: 'string (required) - Sua pergunta sobre jogos',
        category: 'string (optional) - Categoria específica',
        expertiseLevel: 'string (optional) - Nível: iniciante, intermediário, avançado, profissional'
      }
    }
  })
}