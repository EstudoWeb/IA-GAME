'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  Gamepad2, 
  Star,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

interface GameNews {
  id: string
  title: string
  category: string
  time: string
  hotness: number
  url?: string
}

interface GameTrend {
  game: string
  change: number
  players?: string
  category: string
}

const GameNewsWidget = () => {
  const [news, setNews] = useState<GameNews[]>([
    {
      id: '1',
      title: 'Novo patch balancea campeões no League of Legends',
      category: 'MOBA',
      time: '2h atrás',
      hotness: 95,
      url: '#'
    },
    {
      id: '2',
      title: 'Campeonato Mundial de CS2 começa nesta semana',
      category: 'FPS',
      time: '4h atrás',
      hotness: 88,
      url: '#'
    },
    {
      id: '3',
      title: 'Expansão de Final Fantasy XIV quebra recordes',
      category: 'MMORPG',
      time: '6h atrás',
      hotness: 92,
      url: '#'
    },
    {
      id: '4',
      title: 'Novo jogo indie revoluciona gênero roguelike',
      category: 'Indie',
      time: '8h atrás',
      hotness: 76,
      url: '#'
    }
  ])

  const [trends, setTrends] = useState<GameTrend[]>([
    {
      game: 'Valorant',
      change: 12.5,
      players: '2.3M',
      category: 'FPS'
    },
    {
      game: 'Genshin Impact',
      change: 8.2,
      players: '5.1M',
      category: 'Mobile'
    },
    {
      game: 'Elden Ring',
      change: -3.1,
      players: '890K',
      category: 'RPG'
    },
    {
      game: 'Rocket League',
      change: 15.7,
      players: '1.8M',
      category: 'Esports'
    }
  ])

  const getHotnessColor = (hotness: number) => {
    if (hotness >= 90) return 'bg-red-500'
    if (hotness >= 75) return 'bg-orange-500'
    if (hotness >= 60) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-4">
      {/* Notícias Recentes */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Notícias Quentes</h3>
            <Badge variant="outline" className="ml-auto text-xs border-purple-600/30 text-purple-300">
              <Zap className="w-3 h-3 mr-1" />
              Em tempo real
            </Badge>
          </div>
          
          <div className="space-y-3">
            {news.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs bg-purple-800/50 text-purple-200">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-purple-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex flex-col items-center gap-1 ml-2">
                    <div className={`w-2 h-2 rounded-full ${getHotnessColor(item.hotness)}`} />
                    <span className="text-xs text-purple-300">{item.hotness}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-3 text-purple-300 hover:text-purple-200">
            Ver todas as notícias
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Tendências */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Jogos em Alta</h3>
            <Badge variant="outline" className="ml-auto text-xs border-purple-600/30 text-purple-300">
              <Star className="w-3 h-3 mr-1" />
              Top trends
            </Badge>
          </div>
          
          <div className="space-y-3">
            {trends.map((trend, index) => (
              <div key={trend.game} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/20 text-purple-300 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-white">{trend.game}</h4>
                    <Badge variant="secondary" className="text-xs bg-purple-800/50 text-purple-200">
                      {trend.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-medium flex items-center gap-1 ${getChangeColor(trend.change)}`}>
                      {trend.change > 0 ? '↑' : trend.change < 0 ? '↓' : '→'}
                      {Math.abs(trend.change)}%
                    </span>
                    {trend.players && (
                      <span className="text-xs text-purple-300">
                        {trend.players} players
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GameNewsWidget