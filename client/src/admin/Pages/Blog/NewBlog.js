import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import httpContent from '../../../http-content';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';

const NewBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(EditorState.createEmpty());
    const [status, setStatus] = useState('draft');
    const [visibility, setVisibility] = useState('public');
    const [rank, setRank] = useState(0);
    const [date, setDate] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const res = await httpContent.get(`/blogs/${id}`);
                    const blog = res.data;
                    setTitle(blog?.title);

                    const contentState = ContentState.createFromText(blog?.content);
                    const editorState = EditorState.createWithContent(contentState);
                    setContent(editorState);
                    calculateWordCount(editorState);

                    setStatus(blog?.status.charAt(0).toUpperCase() + blog?.status.slice(1));
                    setVisibility(blog?.visibility.charAt(0).toUpperCase() + blog?.visibility.slice(1));
                    setRank(blog?.rank);
                    setDate(moment(blog?.date).format('YYYY-MM-DDTHH:mm'));

                    if (blog?.imageUrl) {
                        setPreviewImage(`${httpContent.defaults.baseURL}/images/${blog.imageUrl.split('/').pop()}`);
                    }
                } catch (error) {
                    setError('Failed to fetch the blog. Please try again later.'); // Set error message
                    console.error("Failed to fetch the blog:", error);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleEditorChange = (state) => {
        setContent(state);
        calculateWordCount(state);
    };

    const calculateWordCount = (state) => {
        const plainText = state.getCurrentContent().getPlainText('');
        const wordsArray = plainText.match(/\b\w+\b/g) || [];
        setWordCount(wordsArray.length);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content.getCurrentContent().getPlainText(''));
        formData.append('status', status);
        formData.append('visibility', visibility);
        formData.append('rank', rank);
        formData.append('date', date);
        if (file) {
            formData.append('file', file);
        } else if (previewImage) {
            formData.append('existingImageUrl', previewImage.split('/').pop());
        }

        try {
            if (id) {
                await httpContent.put(`/blogs/${id}`, formData);
            } else {
                await httpContent.post('/blogs', formData);
            }
            navigate('/admin/blog');
        } catch (error) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error("Error during submission:", error);
        }
    };

    return (
        <div className="p-8 w-full h-[94vh] overflow-y-scroll">
            <h1 className="mb-6 text-3xl font-semibold text-gray-800">{id ? 'Edit Blog' : 'Create New Blog'}</h1>
            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-200 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Publish Date</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Content</label>
                    <Editor
                        editorState={content}
                        toolbarClassName="toolbar-class"
                        wrapperClassName="wrapper-class border border-gray-300 rounded-md shadow-sm"
                        editorClassName="editor-class p-3 h-60"
                        onEditorStateChange={handleEditorChange}
                    />
                    <div className="mt-2 text-sm text-right text-gray-600">Word Count: {wordCount}</div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Visibility</label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Rank</label>
                        <input
                            type="number"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Set blog rank"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png, .webp"
                            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {previewImage && <img src={previewImage} alt="Preview" className="object-cover w-full h-48 mt-4 rounded-md" />}
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 font-medium text-white transition-colors bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
                >
                    {id ? 'Update Blog' : 'Create Blog'}
                </button>
            </form>
        </div>
    );
};

export default NewBlog;
