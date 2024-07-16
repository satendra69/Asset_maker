import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const NewBlog = () => {
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(state?.status || "draft");
    const [visibility, setVisibility] = useState(state?.visibility || "public");
    const [rank, setRank] = useState(state?.rank || "");
    const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm"));
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const [previewImage, setPreviewImage] = useState(null);
    const [wordCount, setWordCount] = useState(0);

    const handleEditorChange = (state) => {
        setEditorState(state);
        calculateWordCount(state);
    };

    const calculateWordCount = (state) => {
        const plainText = state.getCurrentContent().getPlainText('');
        const wordsArray = plainText.match(/\b\w+\b/g) || [];
        setWordCount(wordsArray.length);
    };

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            // send file
        } catch (err) {
            console.log(err);
        }
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

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        if (droppedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(droppedFile);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="px-4 py-8 h-[98vh] overflow-y-scroll">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-lg font-semibold mb-2">Add New Post</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                    />
                    <div className="editorContainer mb-4 border border-gray-300 rounded p-2">
                        <Editor
                            placeholder="Enter Description"
                            editorState={editorState}
                            toolbarClassName="toolbar-class"
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            onEditorStateChange={handleEditorChange}
                            wrapperStyle={{ minHeight: "20em" }}
                        />
                        <div className="text-right text-gray-600">Word Count: {wordCount}</div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-lg font-semibold mb-2">Publish</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status:
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Visibility:
                        </label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Publish immediately:
                        </label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button className="bg-gray-200 px-4 py-2 rounded">
                            Save as a draft
                        </button>
                        <button
                            onClick={handleClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white shadow-md rounded-lg p-8 mb-4 mr-2">
                    <h1 className="text-lg font-semibold mb-2">Rank Position</h1>
                    <input
                        type="rank"
                        placeholder="Rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                </div>
                <div className="bg-white shadow-md rounded-lg p-8 mb-4 items-center justify-center ml-2">
                    <div
                        className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                        id="dropzone"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 z-50"
                            onChange={handleFileChange}
                        />
                        <div className="text-center">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="mx-auto h-32 w-32 object-cover" />
                            ) : (
                                <img
                                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                    alt="Upload"
                                    className="mx-auto h-12 w-12"
                                />
                            )}
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                <label htmlFor="file-upload" className="relative cursor-pointer">
                                    <span>Drag and drop</span>
                                    <span className="text-indigo-600"> or browse</span>
                                    <span> to upload</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>

                        <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default NewBlog;
