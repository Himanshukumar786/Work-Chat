import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';

export const Editor = ({
  variant = 'create',
  onSubmit,
  onCancel,
  placeholder,
  disabled,
  defaultValue
}) => {
  const [text, setText] = useState('');
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef();
  const quillRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );

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
      <div className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition'>
        <div className='h-full ql-custom' ref={containerRef} />
      </div>
      <p className='p-2 text-[10px] text-muted-foreground flex justify-end'>
        <strong>Shift + return</strong>&nbsp; to add a new line
      </p>
    </div>
  );
};
