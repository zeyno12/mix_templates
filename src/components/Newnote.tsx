import { NoteData, Tag } from '../App'
import Noteform from './Noteform'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function Newnote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <>
            <h1>New Note</h1>
            <Noteform onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
}