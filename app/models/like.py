# from .db import db, environment, SCHEMA, add_prefix_for_prod



# likes = db.Table('likes',
#                  db.Model.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
#     db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')),primary_key=True)
# )
# if environment == "production":
#     likes.schema = SCHEMA




# from .db import db, environment, SCHEMA, add_prefix_for_prod


# class Like(db.Model):
#     __tablename__ = 'likes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
#     userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     like = db.Column(db.Boolean, nullable=True)

#     posts = db.relationship("Post", back_populates="likes")
#     users = db.relationship("User", back_populates="likes")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'postId': self.postId,
#             'userId': self.userId,
#             'like': self.like,
#         }

