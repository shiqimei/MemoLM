import { createEffect } from 'solid-js'
import IconSearch from './assets/search.svg'
import IconLightning from './assets/ligntning.svg'
import { createEmptyPage, DocEditor } from '@blocksuite/presets'
import { Text } from '@blocksuite/store'
import '@blocksuite/presets/themes/affine.css'

function App() {
  createEffect(async () => {
    // Init editor with default block tree
    const page = await createEmptyPage().init()
    const editor = new DocEditor()
    editor.page = page
    editor.style.height = '100%'
    editor.style.width = '100%'
    editor.style.zIndex = '10'
    const editorContainer = document.querySelector('#editor')

    if (editorContainer != null) {
      editorContainer.appendChild(editor)
    }

    // Update block node with some initial text content
    const paragraphs = page.getBlockByFlavour('affine:paragraph')
    const paragraph = paragraphs[0]
    page.updateBlock(paragraph, { text: new Text('Hello World!') })
  })

  return (
    <>
      <div class='sidebar w-[300px] h-screen bg-sidebar-background border-r border-seperator-color'>
        <div class='search-container p-4 cursor-pointer'>
          <div class='search w-full h-[32px] border border-input-border rounded-md text-input-foreground bg-input-background hover:bg-input-hover-background hover:text-input-hover-foreground flex items-center box-border p-2'>
            <IconSearch class='icon-search text-input-icon h-[16px] w-[16px] mr-2' />
            <div class='search-placeholder flex-1 text-sm flex items-center justify-between'>
              Find Anything
              <span class='shortcut text-xs bg-shortcut-background border border-shortcut-border rounded ml-1 px-1'>
                ⌘ K
              </span>
            </div>
          </div>
        </div>
        <div class='quick-note-container px-4 pb-4'>
          <div class='select-none bg-white cursor-pointer p-2 py-1 flex items-center border border-message-border rounded-md relative justify-center text-gray-600 hover:text-gray-800 active:border-sidebar-background'>
            <IconLightning class='h-[16px] w-[16px] mx-2 absolute left-0' />
            Quick Capture
          </div>
        </div>
        <div class='notes text-sm text-sidebar-item-foreground select-none'>
          <div class='note px-4 text-sidebar-item-active-foreground bg-sidebar-item-active-background cursor-pointer p-2'>
            GitHub App vs OAuth App
          </div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
          <div class='note cursor-pointer p-2 px-4'>GitHub App vs OAuth App</div>
        </div>
      </div>
      <div class='main w-full h-screen flex flex-col'>
        <div class='messages-container flex-1 h-full flex flex-col-reverse gap-4 p-4'>
          <div class='message w-full flex'>
            <img class='messaeg-author h-6 w-6 mr-3 rounded' src='avatar.jpeg' alt='avatar' />
            <div class='message-content w-full max-w-[672px] h-[100px] bg-white rounded-md border border-message-border text-gray-700 p-2'>
              This is a test message
            </div>
          </div>
          <div class='message w-full flex'>
            <img class='messaeg-author h-6 w-6 mr-3 rounded' src='avatar.jpeg' alt='avatar' />
            <div class='message-content w-full max-w-[672px] h-[100px] bg-white rounded-md border border-message-border text-gray-700 p-2'>
              This is a test message
            </div>
          </div>
        </div>
        <div id='editor-container' class='input w-full h-[350px]'>
          <div
            id='editor'
            class='editor mx-auto w-full h-full bg-white border-t border-message-border'
          ></div>
        </div>
      </div>
    </>
  )
}

export default App
