import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const CommonWysiwyg = (props) => {
    const editorRef = useRef(null);
    const [text, setText] = useState("")

    const handleChange = (val) => {
        props.dataFunction(val, props.name)
    }

    const editorConfiguration = {
        toolbar: ['heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'blockQuote', 'indent', 'numberedList', 'bulletedList', '|', 'fontfamily', 'fontColor', 'fontBackgroundColor', '|', 'undo', 'redo']
    };

    const handleAddPlaceHolder = (text) => {
        if (editorRef.current) {
            const cursorPosition = editorRef.current.editor.model.document.selection.getFirstPosition();
            editorRef.current.editor.model.change((writer) => {
                writer.insertText(text, cursorPosition,);
            });
        }
    }

    useEffect(() => {
        setText(props.text)
    }, [props.text])


    return (

        <div className="input-outer mt-4 ">
            {props.name === "caption" ?
                <label htmlFor="">Article</label>
                :
                <>
                    <label htmlFor="">Place Holders</label>
                    <div className="place-tag mb-4">
                        <button type="button" className="btn btn-primary" onClick={() => handleAddPlaceHolder("{Lead.Name}")}>Lead.Name</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleAddPlaceHolder("{Lead.Email}")}>Lead.Email</button>
                        <button type="button" className="btn btn-success" onClick={() => handleAddPlaceHolder("{Lead.Phone}")}>Lead.Phone</button>
                    </div>
                </>
            }
            <div className="mt-2 order_warp">
                <CKEditor
                    ref={editorRef}
                    onReady={editor => {
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    }}
                    onError={(error, { willEditorRestart }) => {
                        if (willEditorRestart) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChange(data)
                    }}
                    editor={DecoupledEditor}
                    data={text}
                    config={editorConfiguration}
                />
            </div>
        </div>
    )
}

export default CommonWysiwyg