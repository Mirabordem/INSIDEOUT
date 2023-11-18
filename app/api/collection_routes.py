from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Collection, Post, PostCollection
from .auth_routes import validation_errors_to_error_messages
from app.forms import CollectionForm, UpdateCollectionForm, PostCollectionForm
from icecream import ic


collection_routes = Blueprint('collections', __name__)


@collection_routes.route('')
def getAllCollections():
    """Gets all collections."""

    collections = Collection.query.all()
    return [collection.to_dict() for collection in collections]


#___________________________________________________


@collection_routes.route('/<int:collectionId>')
def getSingleCollection(collectionId):
    """Gets single collection by Id."""

    collection = Collection.query.get(collectionId)
    if not collection:
        return {'error': 'Collection not found'}, 404
    return collection.to_dict()


#___________________________________________________



@collection_routes.route('/new', methods=['POST'])
@login_required
def createCollection():
    """
    Creates a new collection.
    """

    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_collection = Collection(
            name = form.data['name'],
            description = form.data['description'],
            type = form.data['type'],
            user_id = current_user.id

        )

        db.session.add(new_collection)
        db.session.commit()
        return new_collection.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}



#___________________________________________________




@collection_routes.route('/edit/<int:collectionId>', methods=['PUT'])
@login_required
def updateCollection(collectionId):
    """
    Updates collection.
    """

    form = UpdateCollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        collection = Collection.query.get(collectionId)

        collection.name = form.data['name']
        collection.description = form.data['description']
        collection.type = form.data['type']

        db.session.commit()

        return collection.to_dict()

    return {'errors': "Could not update this collection"}, 500


#___________________________________________________



@collection_routes.route('/<int:collectionId>', methods=['DELETE'])
@login_required
def deletePostFromCollection(collectionId):
    """
    Deletes collection.
    """

    collection = Collection.query.get(collectionId)

    if not collection:
            return {"error" : "Collection could not found"}, 404

    db.session.delete(collection)
    db.session.commit()

    return {"message": "Successfully deleted comment"}


#___________________________________________________



@collection_routes.route('/addPost', methods=['PUT'])
@login_required
def addPostToCollection():
    """
    Adds post to collection.
    """

    form = PostCollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    ic(form.data)

    if form.validate_on_submit():
        collection = Collection.query.get(form.data['collection_id'])
        post = Post.query.get(form.data['post_id'])



        if not collection or not post:
            return {'errors': "Invalid input"}, 400

        if PostCollection.query.filter_by(post_id=post.id, collection_id=collection.id).first():
            return {'errors': "Post is already in collection."}, 400

        collection.posts.append(post)

        ic([post.to_dict() for post in collection.posts])


        db.session.commit()
        return collection.to_dict()


    return {'errors': form.errors}, 400


#___________________________________________________



@collection_routes.route('/<int:collectionId>/removePost/<int:postId>', methods=['DELETE'])
@login_required
def removePostFromCollection(collectionId, postId):
    """
    Removes post from collection.
    """

    collection = Collection.query.get(collectionId)
    post = Post.query.get(postId)
    idx = collection.posts.index(post)
    collection.posts.pop(idx)

    db.session.commit()
    return collection.to_dict()



#___________________________________________________
