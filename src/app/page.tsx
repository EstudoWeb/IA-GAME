'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Send, 
  Bot, 
  User, 
  Gamepad2, 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Shield, 
  Sword,
  Cpu,
  Monitor,
  Smartphone,
  Wifi,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Loader2
} from 'lucide-react'
import GameNewsWidget from '@/components/GameNewsWidget'
import GameAnalysisWidget from '@/components/GameAnalysisWidget'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  category?: string
}

interface GameCategory {
  name: string
  icon: React.ReactNode
  description: string
  examples: string[]
}

const gameCategories: GameCategory[] = [
  {
    name: 'Jogos Competitivos',
    icon: <Trophy className="w-4 h-4" />,
    description: 'eSports, partidas ranqueadas, metas competitivas',
    examples: ['League of Legends', 'Counter-Strike 2', 'Valorant', 'Rocket League']
  },
  {
    name: 'RPG e MMORPG',
    icon: <Shield className="w-4 h-4" />,
    description: 'Personagens, builds, lore, estratégias de progressão',
    examples: ['World of Warcraft', 'Final Fantasy XIV', 'Elden Ring', 'Baldur\'s Gate 3']
  },
  {
    name: 'FPS e Tiro',
    icon: <Target className="w-4 h-4" />,
    description: 'Aim, estratégias, mapas, armas, táticas',
    examples: ['Call of Duty', 'Overwatch 2', 'Apex Legends', 'Destiny 2']
  },
  {
    name: 'Estratégia',
    icon: <Sword className="w-4 h-4" />,
    description: 'Build orders, táticas, gerenciamento de recursos',
    examples: ['StarCraft 2', 'Age of Empires IV', 'Civilization VI', 'Chess.com']
  },
  {
    name: 'Jogos Mobile',
    icon: <Smartphone className="w-4 h-4" />,
    description: 'Gacha, idle games, competitivo mobile',
    examples: ['Genshin Impact', 'Clash Royale', 'PUBG Mobile', 'Pokémon GO']
  },
  {
    name: 'Indie e Retrô',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Jogos independentes, clássicos, nostalgia',
    examples: ['Hades', 'Stardew Valley', 'Hollow Knight', 'Super Metroid']
  }
]

const exampleQuestions = [
  {
    category: 'Competitivo',
    question: 'Quais são as melhores estratégias para subir de elo no League of Legends?',
    icon: <Trophy className="w-4 h-4" />
  },
  {
    category: 'RPG',
    question: 'Como montar a build perfeita para um mago em Elden Ring?',
    icon: <Shield className="w-4 h-4" />
  },
  {
    category: 'FPS',
    question: 'Quais são os melhores pontos de mira no Valorant?',
    icon: <Target className="w-4 h-4" />
  },
  {
    category: 'Estratégia',
    question: 'Qual é o build order mais eficiente para Protoss em StarCraft 2?',
    icon: <Sword className="w-4 h-4" />
  },
  {
    category: 'Mobile',
    question: 'Como conseguir mais primogemas em Genshin Impact sem pagar?',
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    category: 'Análise',
    question: 'Qual é a diferença entre Dark Souls 3 e Elden Ring?',
    icon: <BookOpen className="w-4 h-4" />
  }
]

export default function GameExpertAI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [expertiseLevel, setExpertiseLevel] = useState<string>('intermediário')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/game-expert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          category: selectedCategory,
          expertiseLevel: expertiseLevel
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao processar sua pergunta')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        category: data.category
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Gamepad2 className="w-12 h-12 text-purple-400" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Game Expert AI
            </h1>
          </div>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Sua especialista em jogos com conhecimento profundo sobre todos os tipos de games — 
            desde mobile e PC até console, indie e AAA
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
              <Cpu className="w-3 h-3 mr-1" /> Análise Técnica
            </Badge>
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
              <TrendingUp className="w-3 h-3 mr-1" /> Meta Atualizada
            </Badge>
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
              <BookOpen className="w-3 h-3 mr-1" /> Lore Completo
            </Badge>
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
              <Target className="w-3 h-3 mr-1" /> Estratégias Profissionais
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Configurações */}
            <Card className="bg-slate-800/50 border-purple-700/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-purple-400" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-purple-200 mb-2 block">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-slate-700 border-purple-600/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-purple-600/30">
                      <SelectItem value="todos">Todas as Categorias</SelectItem>
                      {gameCategories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          <div className="flex items-center gap-2">
                            {cat.icon}
                            {cat.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-purple-200 mb-2 block">Nível de Expertise</label>
                  <Select value={expertiseLevel} onValueChange={setExpertiseLevel}>
                    <SelectTrigger className="bg-slate-700 border-purple-600/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-purple-600/30">
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediário">Intermediário</SelectItem>
                      <SelectItem value="avançado">Avançado</SelectItem>
                      <SelectItem value="profissional">Profissional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Game Analysis Widget */}
            <GameAnalysisWidget />

            {/* Game News Widget */}
            <GameNewsWidget />

            {/* Categorias */}
            <Card className="bg-slate-800/50 border-purple-700/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-purple-400" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {gameCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-200 font-medium">
                      {category.icon}
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <p className="text-xs text-purple-300 ml-6">{category.description}</p>
                    <div className="flex flex-wrap gap-1 ml-6">
                      {category.examples.slice(0, 2).map((example) => (
                        <Badge key={example} variant="outline" className="text-xs border-purple-600/30 text-purple-300">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-purple-700/30 h-[600px] flex flex-col">
              <CardHeader className="pb-3 border-b border-purple-700/30">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  Consulte o Especialista
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[440px] p-4">
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <Bot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Olá! Sou sua especialista em jogos
                        </h3>
                        <p className="text-purple-200 mb-6">
                          Posso ajudar com qualquer dúvida sobre jogos. 
                          Escolha uma pergunta exemplo ou digite a sua:
                        </p>
                      </div>
                      
                      <div className="grid gap-3">
                        {exampleQuestions.map((example, index) => (
                          <Card 
                            key={index}
                            className="bg-slate-700/30 border-purple-600/20 cursor-pointer hover:bg-slate-700/50 transition-colors"
                            onClick={() => handleExampleClick(example.question)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <div className="text-purple-400 mt-1">
                                  {example.icon}
                                </div>
                                <div className="flex-1">
                                  <Badge variant="outline" className="text-xs border-purple-600/30 text-purple-300 mb-2">
                                    {example.category}
                                  </Badge>
                                  <p className="text-sm text-purple-100">
                                    {example.question}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                            <div
                              className={`rounded-lg p-3 ${
                                message.role === 'user'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-700/50 text-purple-100'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              {message.category && (
                                <Badge variant="outline" className="mt-2 text-xs border-purple-600/30 text-purple-300">
                                  {message.category}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-purple-300 mt-1 px-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center flex-shrink-0 order-2">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-slate-700/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                              <span className="text-sm text-purple-100">Analisando...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-purple-700/30">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Faça sua pergunta sobre jogos..."
                    className="flex-1 bg-slate-700/50 border-purple-600/30 text-white placeholder-purple-300 resize-none"
                    rows={2}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white self-end"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}