import IconSearch from './assets/search.svg'
import IconHome from './assets/home.svg'
import { createEffect, createSignal } from 'solid-js'
import dayjs from 'dayjs'

interface IMemo {
  type: 'text' | 'image' | 'video'
  content: string
  created_at: number
}

function createLocalSignal(key: string, initialValue: IMemo[]) {
  // Attempt to get the stored value from localStorage
  const storedValue = localStorage.getItem(key);
  // If there's a stored value, parse it, otherwise use the provided initial value
  const [value, setValue] = createSignal(storedValue ? JSON.parse(storedValue) : initialValue);

  // Function to update localStorage
  const updateLocalStorage = () => {
    localStorage.setItem(key, JSON.stringify(value()));
  };

  // Update localStorage whenever the value changes
  createEffect(() => {
    updateLocalStorage();
  });

  // Return the signal and the function to update it
  return [value as unknown as () => IMemo[], setValue as (memos: IMemo[]) => void] as const;
}

function App() {
  const [memos, setMemos] = createLocalSignal('memos', [])
  createEffect(async () => {
    const resp = await fetch('/api/memo/list')
    const json = await resp.json() as IMemo[]
    setMemos(json)
  })

  function renderMemo(memo: IMemo) {
    switch (memo.type) {
      case 'text': {
        return (
          <div class='message-content w-full max-w-[672px] bg-white rounded-md border border-message-border text-gray-700 p-4 text-sm whitespace-pre-wrap'>
            {memo.content}
          </div>
        )
      }
      case 'image': {
        return (
          <img class='message-content min-w-[100px] min-h-[100px] max-w-[300px] bg-white rounded-md border border-message-border text-gray-700 text-sm' src={`/api/assets/${memo.content}`} alt={memo.content} />
        )
      }
      case 'video': {
        return (
          <video controls width="250" class='message-content max-w-[300px] bg-white rounded-md border border-message-border text-gray-700 text-sm'>
            <source src={`/api/assets/${memo.content}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      }
    }
  }

  return (
    <>
      <div class='sidebar w-[300px] h-screen bg-sidebar-background border-r border-seperator-color'>
        <div class='search-container p-4 cursor-pointer'>
          <div class='search w-full h-[32px] border border-input-border rounded-md text-input-foreground bg-input-background hover:bg-input-hover-background hover:text-input-hover-foreground flex items-center box-border p-2'>
            <IconSearch class='icon-search text-input-icon h-[16px] w-[16px] mr-2' />
            <div class='search-placeholder flex-1 text-sm flex items-center justify-between select-none'>
              Find Anything
              <span class='shortcut text-xs bg-shortcut-background border border-shortcut-border rounded ml-1 px-1'>
                ⌘ K
              </span>
            </div>
          </div>
        </div>
        <div class='notes text-sm text-sidebar-item-foreground select-none'>
          <div class='note px-4 text-sidebar-item-active-foreground bg-sidebar-item-active-background cursor-pointer p-2 flex items-center'>
            <IconHome class='h-[15px] w-[15px] mr-2' />
            <span class='font-semibold'>Home</span>
          </div>
          <div class='note px-4 text-sidebar-item-active-foreground cursor-pointer p-2'>
            GitHub App vs OAuth App
          </div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
        </div>
      </div>
      <div class='main w-full h-screen flex flex-col'>
        <div class='messages flex-1 h-full flex flex-col-reverse gap-4 p-4 overflow-auto'>
          {memos().map(memo => {
            return (
              <div class='message w-full flex'>
                <img class='messaeg-author h-6 w-6 mr-3 rounded' src='avatar.jpeg' alt='avatar' />
                <div>
                  <div class='message-date w-full text-gray-400 text-xs mb-1'>{dayjs(memo.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                  {renderMemo(memo)}
                </div>
              </div>
            )
          })}
        </div>
        <div id='editor-container' class='input w-full h-[350px] bg-white outline-none p-4 text-md text-[#262626] border-t border-seperator-color' contentEditable />
      </div>
    </>
  )
}

export default App
