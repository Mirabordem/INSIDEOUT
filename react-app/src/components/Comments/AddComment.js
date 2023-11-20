import React from "react";
import { useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { createCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import "./Comments.css"

export default function AddComment({ postId }) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = {
            "text": text
        }

        await dispatch(createCommentThunk(comment, postId))
        return closeModal()
    }

    useEffect(() => {
        const obj = {}
        if (text && text.length < 10) {
            obj.text = "Comment must be minimum 10 character"
        }
        setErrors(obj)
    }, [text])


    return (
    <div className="new-comment-main-container">
        <form onSubmit={handleSubmit} className="createReviewForm">

    <label className="comments-share-title">Share Your Thoughts</label>
        <textarea
        className="textArea"
        value={text}
        onChange={e => setText(e.target.value)}/>
        <p className="errors smallFont">{errors.text}</p>
        <button disabled={Object.values(errors).length > 0 } className="submit-comment-button" type="submit">SUBMIT COMMENT</button>
        </form>
    </div>
)
}
