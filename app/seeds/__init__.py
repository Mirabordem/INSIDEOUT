from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .posts import seed_posts, undo_posts
from .collections import seed_collections, undo_collections
from .post_collection import undo_posts_collections
from .comments import seed_comments, undo_comments
# from .likes import seed_likes, undo_likes



from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_posts_collections()
        undo_comments()
        # undo_likes()
        undo_collections()
        undo_posts()
        undo_photos()
        undo_users()
    seed_users()
    seed_photos()
    posts = seed_posts()
    # seed_likes()
    seed_comments()
    seed_collections(posts)


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_posts_collections()
    undo_comments()
    # undo_likes()
    undo_photos()
    undo_collections()
    undo_posts()
    undo_users()
    # Add other undo functions here
