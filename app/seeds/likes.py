# from app.models import db, User, environment, SCHEMA, Post
# from sqlalchemy.sql import text
# from random import sample


# def seed_likes():
#     users = User.query.all()
#     posts = Post.query.all()
#     for user in users:
#         post_selection = sample(posts, 40)
#         user.liked_posts.extend(post_selection)
#     db.session.commit()




# def undo_likes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM likes"))

#     db.session.commit()







# from app.models import db, Like, environment, SCHEMA
# from sqlalchemy.sql import text
# import random

# def seed_likes():
#     def generate_random_post_id():
#         return random.randint(1, 40)


#     def generate_random_user_id():
#         return random.randint(1, 3)

#     posts = 40
#     users = 3

#     likes_to_add = []
#     uniqueSets = []

#     for uid in range (2, users + 1):
#         for pid in range(1, posts + 1):

#             like = Like(
#                 postId=pid,
#                 userId=uid,
#                 like=(random.randint(1,2)==1)
#             )
#             likes_to_add.append(like)

#     for like in likes_to_add:
#         db.session.add(like)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_likes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM likes"))

#     db.session.commit()
