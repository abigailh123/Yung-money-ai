"use client"

import React from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
  loading?: boolean
  className?: string
  children: React.ReactNode
}

interface ChatInputTextAreaProps {
  placeholder?: string
  className?: string
}

interface ChatInputSubmitProps {
  className?: string
}

const ChatInputContext = React.createContext<{
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
  loading?: boolean
} | null>(null)

export function ChatInput({ value, onChange, onSubmit, loading, className, children }: ChatInputProps) {
  return (
    <ChatInputContext.Provider value={{ value, onChange, onSubmit, loading }}>
      <div className={`relative bg-background border border-border rounded-lg shadow-sm ${className}`}>
        {children}
      </div>
    </ChatInputContext.Provider>
  )
}

export function ChatInputTextArea({ placeholder, className }: ChatInputTextAreaProps) {
  const context = React.useContext(ChatInputContext)
  if (!context) throw new Error("ChatInputTextArea must be used within ChatInput")

  const { value, onChange, onSubmit, loading } = context

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!loading && value.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <textarea
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={loading}
      rows={1}
      className={`w-full resize-none border-0 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        minHeight: "44px",
        maxHeight: "200px",
      }}
    />
  )
}

export function ChatInputSubmit({ className }: ChatInputSubmitProps) {
  const context = React.useContext(ChatInputContext)
  if (!context) throw new Error("ChatInputSubmit must be used within ChatInput")

  const { value, onSubmit, loading } = context

  return (
    <button
      onClick={onSubmit}
      disabled={loading || !value.trim()}
      className={`absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Send className="h-4 w-4" />
      <span className="sr-only">Send message</span>
    </button>
  )
}
