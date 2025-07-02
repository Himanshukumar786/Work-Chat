import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

export const Editor = ({
  variant = 'create',
  onSubmit,
  onCancel,
  placeholder,
  disabled,
  defaultValue
}) => {
  const [text, setText] = useState('');
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
          ['link', 'image'],
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
        {/* 👇 Quill editor will be rendered inside this */}
        <div className='h-full ql-custom' ref={containerRef} />

                <div className='flex px-2 pb-2 z-[5]'>
                    <Button
                        size="iconSm"
                        variant="ghost"
                        disabled={false}
                        onClick={toggleToolbar}
                    >
                        <PiTextAa className='size-4' />
                    </Button>
                </div>
            </div>

      <p className='p-2 text-[10px] text-muted-foreground flex justify-end'>
        <strong>Shift + return</strong>&nbsp; to add a new line
      </p>
    </div>
  );
};
