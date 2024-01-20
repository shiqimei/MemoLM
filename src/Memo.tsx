import { createSignal, Show, onMount, onCleanup } from 'solid-js';
import { IMemo } from './types';
import './github-markdown.css'

interface IMemoProps {
    memo: IMemo
}

export function Memo({ memo }: IMemoProps) {
    const [root, setRoot] = createSignal();
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [selectedImage, setSelectedImage] = createSignal('');
    const [showTooltip, setShowTooltip] = createSignal(false);

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const handleCopyClick = (text, block) => {
        navigator.clipboard.writeText(text);
        setShowTooltip(true);

        // Hide tooltip after 2 seconds
        setTimeout(() => setShowTooltip(false), 2000);
    };


    onMount(() => {
        if (memo.type == 'text') {
            const codeBlocks = root().querySelectorAll('.highlight pre') as NodeListOf<HTMLDivElement>;

            codeBlocks.forEach((block: HTMLDivElement) => {
                block.style.position = 'relative'
                block.style.paddingRight = '50px'
                const copyButton = document.createElement('div');
                copyButton.className = 'inline-block absolute inset-0 transform translate-x-1/2';
                copyButton.setAttribute('aria-label', 'Copy to clipboard');
                copyButton.innerHTML = `
                <svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
            `;
                copyButton.onclick = () => {
                    navigator.clipboard.writeText(block.innerText);
                    handleCopyClick(block.textContent, block);
                };

                block.appendChild(copyButton);
            });

            onCleanup(() => {
                codeBlocks.forEach(block => {
                    const container = block.querySelector('.Tooltip__TooltipBase-sc-17tf59c-0');
                    if (container) {
                        block.removeChild(container);
                    }
                });
            });
        }
    });

    const renderMemoContent = () => {
        switch (memo.type) {
            case 'text':
                return <div class="w-full max-w-[672px] bg-white  cursor-text" ref={setRoot}>
                    <article class="markdown-body text-gray-700 p-2 text-sm  whitespace-pre-wrap  rounded-md border border-gray-300 relative" innerHTML={memo.content}>
                        {showTooltip() && (
                            <div class="tooltip absolute right-2 top-2">Copied!</div>
                        )}
                    </article>
                </div>;
            case 'image':
                return (
                    <img
                        class="min-w-[100px] min-h-[100px] max-w-[300px] bg-white rounded-md border border-gray-300 text-gray-700 text-sm cursor-pointer"
                        src={`/api/assets/${memo.content}`}
                        alt={memo.content}
                        onClick={() => handleImageClick(`/api/assets/${memo.content}`)}
                    />
                );
            case 'video':
                return (
                    <video controls width="250" class="max-w-[300px] bg-white rounded-md border border-gray-300 text-gray-700 text-sm">
                        <source src={`/api/assets/${memo.content}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderMemoContent()}
            <Show when={isModalOpen()}>
                <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
                    <img src={selectedImage()} alt="Full Screen" class="max-w-[90%] max-h-[90%]" />
                    <button class="absolute top-4 right-4 text-white text-2xl" onClick={() => setIsModalOpen(false)}>&times;</button>
                </div>
            </Show>
        </>
    );
}
