export interface IMemo {
  type: 'text' | 'image' | 'video'
  content: string
  created_at: number
  archived: 0 | 1
  html: string | null
}
