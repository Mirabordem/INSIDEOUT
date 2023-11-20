import React from "react";
import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import "./Comments.css"


export default function CommentDelete({commentId}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    function deleteFunction() {
        dispatch(deleteCommentThunk(commentId))
        return closeModal()
    }
    return(
    <div className='delete-container'>
        <div className="h1">Are You Sure?</div>
        <button className="confirm-button" onClick={deleteFunction}>Remove</button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
    </div>
)
}
