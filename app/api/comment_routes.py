from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Comment, Post
from app.forms import CommentForm
from datetime import date
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload


comment_routes = Blueprint("comments", __name__)


#___________________________________________________


@comment_routes.route("/all")
def get_comments():
    """
    Gets all comment of one post.
    """
    # comments = Comment.query.all()
    comments = Comment.query.options(joinedload(Comment.user)).all()
    return [comment.to_dict() for comment in comments]


  #___________________________________________________



@comment_routes.route("/new", methods=["GET", "POST"])
@login_required
def create_comment():
    """
    New comment.
    """

    form = CommentForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        data = form.data

        new_comment = Comment(
            post_id=data['post_id'],
            user_id=current_user.id,
            text=data['text'],
            created_at=date.today(),
            updated_at=date.today()
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#___________________________________________________


@comment_routes.route("/<int:commentId>", methods=["PUT"])
@login_required
def update_comment(commentId):
    """
    Edits a comment.
    """
    comment = Comment.query.get(commentId)
    if comment and comment.user_id == current_user.id:
      form = CommentForm()
      data = form.data
      form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            data = form.data

            comment.text = data['text']
            comment.updated_at=date.today()
            db.session.commit()
            return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#___________________________________________________


@comment_routes.route("/<int:commentId>/delete", methods=["DELETE"])
@login_required
def delete_comment(commentId):
    """
    Deletes a comment.
    """
    comment = Comment.query.get(commentId)

    # if comment and comment.userId == current_user.id:
    if comment:
        db.session.delete(comment)
        db.session.commit()
        # return {"message": "Comment deleted successfully"}
        return comment.to_dict()
    else:
        return {"error": "Comment not found or user unauthorized"}, 404



#___________________________________________________
