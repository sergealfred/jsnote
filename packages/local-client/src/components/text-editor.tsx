import './text-editor.css';
import MEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef} from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current && ref.current.contains(event.target as Node)) {
                // console.log('element clicked on is inside editor');
                return;
            }
            // console.log('element clicked on is NOT inside editor');
            setEditing(false);
        };

        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MEditor
                    value={cell.content}
                    onChange={text => updateCell(cell.id, text || '')}
                />
            </div>
        );    
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MEditor.Markdown
                    source={cell.content || 'Click to edit'}
                />
            </div>


        </div>
    );
}

export default TextEditor;