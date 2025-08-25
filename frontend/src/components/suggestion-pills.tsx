"use client"

interface SuggestionPillsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export function SuggestionPills({ suggestions, onSuggestionClick }: SuggestionPillsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 text-sm bg-transparent border-2 border-brand-green text-brand-green dark:text-brand-yellow-light hover:bg-brand-green hover:text-white font-medium rounded-full transition-all transform hover:scale-105"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
