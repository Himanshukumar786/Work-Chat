import Quill from 'quill';
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

        const options = {
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
                                const range = quill.getSelection();
                                if (range) {
                                    quill.insertText(range.index, '\n');
                                    quill.setSelection(range.index + 1);
                                }
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);
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
    }, []);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition'>
                <div ref={containerRef} />
            </div>
        </div>
    );
};
