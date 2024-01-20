import { createSignal, Show, onMount, onCleanup } from 'solid-js';
import { IMemo } from './types';
import './github-markdown.css'

interface IMemoProps {
    memo: IMemo
}

export function Memo({ memo }: IMemoProps) {
    const [root, setRoot] = createSignal<HTMLDivElement>();
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [selectedImage, setSelectedImage] = createSignal('');
    const [showTooltip, setShowTooltip] = createSignal(false);

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    console.log(memo)
    const renderMemoContent = () => {
        switch (memo.type) {
            case 'text':
                return <div class="w-full max-w-[772px] bg-white  cursor-text" ref={setRoot}>
                    <article class="markdown-body text-gray-700 p-2 text-sm rounded-md border border-gray-300 p-4" innerHTML={memo.html?.length ? memo.html : memo.content}>
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
