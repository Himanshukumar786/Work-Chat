import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { PiTextAa } from 'react-icons/pi';
import { ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Hint } from '../Hint/Hint';
import { MdSend } from 'react-icons/md';

export const Editor = ({
  onSubmit,
  placeholder,
  disabled,
  defaultValue
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const containerRef = useRef();
  const quillRef = useRef();

  function toggleToolbar() {
    setIsToolbarVisible((prev) => !prev);
    const toolbar = containerRef.current?.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.classList.toggle('hidden');
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Clear previous content
    container.innerHTML = '';

    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      theme: 'snow',
      placeholder: placeholder || '',
      readOnly: disabled || false,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                return;
              }
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                const quill = quillRef.current;
                const range = quill?.getSelection();
                if (range) {
                  quill.insertText(range.index, '\n');
                  quill.setSelection(range.index + 1);
                }
              }
            }
          }
        }
      }
    });

    quillRef.current = quill;
    quill.focus();

    if (defaultValue) {
      try {
        const parsed = JSON.parse(defaultValue);
        quill.setContents(parsed);
      } catch {
        quill.setText(defaultValue);
      }
    }

    return () => {
      container.innerHTML = '';
      quillRef.current = null;
    };
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='relative border border-slate-300 rounded-md overflow-hidden bg-white'>
        {/* Quill editor goes here */}
        <div
          className='h-full ql-custom'
          ref={containerRef}
          style={{ minHeight: '120px', paddingBottom: '40px' }}
        />

        {/* Bottom toolbar buttons */}
        <div className='absolute bottom-2 left-2 flex gap-3 z-10'>
          <Hint label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'} side='top' align='center'>
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className='size-4' />
            </Button>
          </Hint>
          <Hint label="Insert image" side='top' align='center'>
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={() => {
                // Future image handler here
              }}
            >
              <ImageIcon className='size-4' />
            </Button>
          </Hint>
        </div>
        <div className='absolute bottom-2 right-2 z-10'>
          <Hint label="Send message">
            <Button
              size="iconSm"
              className="w-8 h-8 p-0 flex items-center justify-center rounded-md bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={() => {
                const messageContent = JSON.stringify(quillRef.current?.getContents());
                  onSubmit({ body: messageContent });
                  quillRef.current?.setText('');
              }}
              disabled={false}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
      <p className='p-2 text-[10px] text-muted-foreground flex justify-end'>
        <strong>Shift + return</strong>&nbsp; to add a new line
      </p>
    </div>
  );
};
