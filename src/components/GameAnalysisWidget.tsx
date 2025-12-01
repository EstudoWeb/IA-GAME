'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  BarChart3, 
  Star, 
  Users, 
  Calendar, 
  DollarSign,
  Monitor,
  Gamepad2,
  Cpu,
  Wifi,
  Trophy,
  Clock,
  TrendingUp,
  Heart,
  MessageSquare,
  ExternalLink
} from 'lucide-react'

interface GameAnalysis {
  name: string
  category: string
  rating: number
  players: string
  releaseDate: string
  price: string
  platforms: string[]
  requirements: {
    min: string
    recommended: string
  }
  strengths: string[]
  weaknesses: string[]
  metaScore: number
  userScore: number
  playTime: string
  difficulty: string
  onlineFeatures: string[]
  lastUpdate: string
}

const GameAnalysisWidget = () => {
  const [selectedGame, setSelectedGame] = useState<string>('valorant')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const gamesData: Record<string, GameAnalysis> = {
    valorant: {
      name: 'Valorant',
      category: 'FPS Tático',
      rating: 4.2,
      players: '2.3M',
      releaseDate: '2020',
      price: 'Gratuito',
      platforms: ['PC'],
      requirements: {
        min: 'Core i3 / 4GB RAM / GTX 1050',
        recommended: 'Core i5 / 8GB RAM / GTX 1060'
      },
      strengths: ['Gameplay tático profundo', 'Balanceamento competitivo', 'Gratuito', 'Cena eSports forte'],
      weaknesses: ['Requer conexão estável', 'Curva de aprendizado íngreme', 'Poucos modos'],
      metaScore: 84,
      userScore: 4.1,
      playTime: '300-500 horas',
      difficulty: 'Alto',
      onlineFeatures: ['Competitivo 5v5', 'Spike Rush', 'Deathmatch', 'Treinamento'],
      lastUpdate: 'Patch 7.12 - 2 semanas atrás'
    },
    genshin: {
      name: 'Genshin Impact',
      category: 'RPG de Ação',
      rating: 4.5,
      players: '5.1M',
      releaseDate: '2020',
      price: 'Free-to-play',
      platforms: ['PC', 'Mobile', 'PS4/5'],
      requirements: {
        min: 'Core i5 / 8GB RAM / GTX 1030',
        recommended: 'Core i7 / 16GB RAM / GTX 1060'
      },
      strengths: ['Mundo aberto vasto', 'Gráficos impressionantes', 'Cross-platform', 'Conteúdo contínuo'],
      weaknesses: ['Sistema gacha', 'Grind excessivo', 'Requer conexão constante'],
      metaScore: 86,
      userScore: 4.3,
      playTime: '200+ horas',
      difficulty: 'Médio',
      onlineFeatures: ['Co-op 4 jogadores', 'Eventos sazonais', 'Raids', 'Sistema de gacha'],
      lastUpdate: 'Versão 4.5 - 1 semana atrás'
    }
  }

  const currentGame = gamesData[selectedGame]

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400'
    if (rating >= 4.0) return 'text-yellow-400'
    if (rating >= 3.5) return 'text-orange-400'
    return 'text-red-400'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-600'
      case 'Médio': return 'bg-yellow-600'
      case 'Alto': return 'bg-orange-600'
      case 'Muito Alto': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const handleAnalyzeGame = async (gameName: string) => {
    setIsAnalyzing(true)
    // Simulação de análise
    setTimeout(() => {
      setSelectedGame(gameName === 'valorant' ? 'genshin' : 'valorant')
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <Card className="bg-slate-800/50 border-purple-700/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Análise de Jogos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Game Selector */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedGame === 'valorant' ? 'default' : 'outline'}
            onClick={() => setSelectedGame('valorant')}
            className="flex-1"
          >
            Valorant
          </Button>
          <Button
            size="sm"
            variant={selectedGame === 'genshin' ? 'default' : 'outline'}
            onClick={() => setSelectedGame('genshin')}
            className="flex-1"
          >
            Genshin Impact
          </Button>
        </div>

        {/* Game Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{currentGame.name}</h3>
              <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
                {currentGame.category}
              </Badge>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getRatingColor(currentGame.rating)}`}>
                {currentGame.rating}/5
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-300">
                <Star className="w-3 h-3 fill-current" />
                <span>Avaliação</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Jogadores</span>
              </div>
              <div className="text-lg font-semibold text-white">{currentGame.players}</div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Lançamento</span>
              </div>
              <div className="text-lg font-semibold text-white">{currentGame.releaseDate}</div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs">Preço</span>
              </div>
              <div className="text-lg font-semibold text-white">{currentGame.price}</div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Tempo de Jogo</span>
              </div>
              <div className="text-lg font-semibold text-white">{currentGame.playTime}</div>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <div className="flex items-center gap-2 text-purple-300 mb-2">
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Plataformas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentGame.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="border-purple-600/30 text-purple-300">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* System Requirements */}
          <div>
            <div className="flex items-center gap-2 text-purple-300 mb-2">
              <Cpu className="w-4 h-4" />
              <span className="text-sm">Requisitos</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="text-purple-200">
                <span className="font-medium">Mínimo:</span> {currentGame.requirements.min}
              </div>
              <div className="text-purple-200">
                <span className="font-medium">Recomendado:</span> {currentGame.requirements.recommended}
              </div>
            </div>
          </div>

          {/* Scores */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-300">Meta Score</span>
              <span className="text-sm font-medium text-white">{currentGame.metaScore}/100</span>
            </div>
            <Progress value={currentGame.metaScore} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-300">User Score</span>
              <span className="text-sm font-medium text-white">{currentGame.userScore}/5</span>
            </div>
            <Progress value={(currentGame.userScore / 5) * 100} className="h-2" />
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Pontos Fortes</span>
              </div>
              <ul className="space-y-1">
                {currentGame.strengths.slice(0, 2).map((strength, index) => (
                  <li key={index} className="text-xs text-green-300 flex items-start gap-1">
                    <span className="text-green-400 mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <TrendingUp className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Pontos Fracos</span>
              </div>
              <ul className="space-y-1">
                {currentGame.weaknesses.slice(0, 2).map((weakness, index) => (
                  <li key={index} className="text-xs text-red-300 flex items-start gap-1">
                    <span className="text-red-400 mt-0.5">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Online Features */}
          <div>
            <div className="flex items-center gap-2 text-purple-300 mb-2">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Recursos Online</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentGame.onlineFeatures.slice(0, 3).map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs border-purple-600/30 text-purple-300">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-purple-300 text-center">
            {currentGame.lastUpdate}
          </div>

          <Separator className="bg-purple-700/30" />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleAnalyzeGame(selectedGame)}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analisando...' : 'Analisar Similar'}
            </Button>
            <Button size="sm" variant="outline" className="border-purple-600/30 text-purple-300">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GameAnalysisWidget