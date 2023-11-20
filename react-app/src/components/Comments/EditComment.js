import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { updateCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import "./Comments.css"


export default function EditComment({ commentId, postId }) {
    const comments = useSelector((state) => state.comments)
    const currCommentArr = Object.values(comments).filter((comment) => comment.id == commentId)
    const currComment = currCommentArr[0]

    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [text, setText] = useState(currComment.text)
    const [errors, setErrors] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = {
            "text": text
        }
        await dispatch(updateCommentThunk(comment, commentId, postId))
        return closeModal()

    }

    useEffect(() => {
        const obj = {}

        if (text.length < 1) {
            obj.text = "Comment must be minimum 1 character"
        }

        setErrors(obj)
    }, [text])

    return (
    <div className="new-comment-main-container">
        <form onSubmit={handleSubmit} className="createReviewForm">
  <label className="comments-share-title">Update Your Comment</label>
        <textarea
        className="textArea"
        value={text}
        onChange={e => setText(e.target.value)}/>
         <p className="smallFont">{errors.text}</p>
        <button disabled={Object.values(errors).length > 0 } className="submit-comment-button" type="submit">SUBMIT COMMENT</button>
        </form>
    </div>

)
}
