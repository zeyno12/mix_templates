import { useMemo, useState } from "react";
import { Button, Col, Row, Stack, Form, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { Tag, Note } from "../App";
import styles from '../NoteLisy.module.css'
type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}
type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export default function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectTags, setSelectTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectTags.length === 0 || selectTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectTags, notes])

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={'/new'}>
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectTags.map(tag => ({ label: tag.label, value: tag.id }))}
                                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                                onChange={tags => {
                                    setSelectTags(tags.map(tag => ({ label: tag.label, id: tag.value })))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <Card as={Link} to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className="fs-5">
                    {title}
                </span>
                {tags.length > 0 && (
                    <Stack direction="horizontal" gap={1} className="justify-content-center flex-wrap" >
                        {tags.map(tag => (
                            <Badge className='text-truncate'
                                key={tag.id}>{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}