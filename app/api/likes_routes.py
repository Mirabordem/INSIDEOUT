# from flask import Blueprint, jsonify, request
# from flask_login import login_required
# from app.models import User, Post, Like, db
# from ..forms import NewLikeForm, EditLikeForm


# like_routes = Blueprint('likes', __name__)



# @like_routes.route('/<int:id>')
# def singleLike(id):
#     """
#     Single Like by id.
#     """
#     like = Like.query.get(id)
#     if like:
#       return like.to_dict()
#     else:
#       return jsonify({'error': 'There is no Like'}), 404





# @like_routes.route('/new', methods=["POST"])
# def createNewLike():
#   """
#   Creates a new like.
#   """
#   request_data=request.get_json()

#   form = NewLikeForm()

#   form['csrf_token'].data = request.cookies['csrf_token']

#   data = form.data

#   if form.validate_on_submit():
#     likeCheck = Like.query.filter_by(userId=data['userId'], postId=data['postId']).first()

#     if(likeCheck):
#       return jsonify({'error': 'User already liked the post.'}), 404

#     newLike = Like(
#       postId = data['postId'],
#       userId = data['userId'],
#       like = data['like']
#     )


#     db.session.add(newLike)
#     db.session.commit()
#     return newLike.to_dict()
#   return {"errors":form.errors}, 401





# @like_routes.route('/edit/<int:id>', methods=["PUT"])
# def editLike(id):
#   """
#   Edits like.
#   """
#   request_data=request.get_json()

#   form = EditLikeForm()

#   form['csrf_token'].data = request.cookies['csrf_token']

#   data = form.data

#   if form.validate_on_submit():
#     likeEdit = Like.query.get(id)
#     if likeEdit:
#       likeEdit.like = data['like']

#       db.session.commit()
#       return likeEdit.to_dict()

#     else:
#       return jsonify({'error': 'There is no like.'}), 404
#   return {"errors":form.errors}, 401



