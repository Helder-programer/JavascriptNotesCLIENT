import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Editor({ currentNote, updateNote }) {
    const [currentContent, setCurrentContent] = useState('');
    //Estado utilizado para realizar autoSave
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setCurrentContent(currentNote.body);
    }, [currentNote]);



    const updateNoteInEditor = content => {
        updateNote(currentNote, { body: content });
    }



    //Parâmetros delta e source são padrões do react quill. Source faz menção ao meio de atualização. Pode ser usuário ou API.
    const handleChange = (content, delta, source) => {
        clearTimeout(timer);
        if (source == 'user') {
            setCurrentContent(content);
            setTimer(setTimeout(() => updateNoteInEditor(content), 2000));
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <>
            <ReactQuill value={currentContent} modules={modules} onChange={handleChange} />
        </>
    );
}

export default Editor;