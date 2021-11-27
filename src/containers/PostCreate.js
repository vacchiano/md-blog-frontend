import React, {useRef, useState} from 'react'
import { Button, Divider, Form, Header } from 'semantic-ui-react'
import Message from '../components/Message'
import { history } from '../helpers';
import { api } from '../api';

import axios from 'axios'

// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const PostCreate = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState(null)
    const [markdown, setMarkdown] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const fileInputRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        // the formData key names match the field names
        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", markdown)

        axios
            .post(api.posts.create, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Token 9940b2a9ab7d7457c6fc97c0e3d399e449844a1b"
            }
            })
            .then(res => {
                setLoading(false)
                history.push('/')
                // if success redirect to post list
            })
            .catch(error => {
                setLoading(false)
                setError(error.message || error)
            })
    }

    return (
        <div>
            <Header>Create a post</Header>
            <Divider />
            {error && <Message danger message={error} />}
            {thumbnail && <Message info message={`Selected thumbnail image: ${thumbnail.name}`} />}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input
                        placeholder='Post Title' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={({text}) => setMarkdown(text)} />
                </Form.Field>
                <Form.Field>
                    <label>Thumbnail</label>
                    <Button 
                        type="button"
                        fluid
                        content="Choose a file" 
                        labelPosition="left" 
                        icon="file" 
                        onClick={() => fileInputRef.current.click()}
                    />
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        hidden 
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </Form.Field>
            <Button loading={loading} disabled={loading} primary fluid type='submit'>Submit</Button>
        </Form>
        </div>
    )
}

export default PostCreate;
