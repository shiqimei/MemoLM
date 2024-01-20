import { createSignal, Show } from 'solid-js';
import { IMemo } from './types';
import './github-markdown.css'

interface IMemoProps {
    memo: IMemo
}

export function Memo({ memo }: IMemoProps) {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [selectedImage, setSelectedImage] = createSignal('');

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const renderMemoContent = () => {
        switch (memo.type) {
            case 'text':
                return <div class="w-full max-w-[672px] bg-white">
                    <article class="markdown-body text-gray-700 p-2 text-sm  whitespace-pre-wrap  rounded-md border border-gray-300" innerHTML={memo.content}>
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
