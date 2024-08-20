import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useLocalStorage } from './hook/useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import { Newnote } from './components/Newnote'
import NoteList from './components/NoteList'

 export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {
        ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) 
      }]
    })
  }


  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList availableTags={tags} notes={notesWithTags} />}></Route>
        <Route path='/new' element={<Newnote
          onAddTag={addTag} availableTags={tags}
          onSubmit={onCreateNote} />} ></Route>
        <Route path='/:id'>
          <Route index element={<p>show</p>}></Route>
          <Route path='edit' element={<p>Edit</p>}></Route>
        </Route>
        <Route path='*' element={<Navigate to="/" />} ></Route>
      </Routes>
    </Container >
  )
}

export default App
