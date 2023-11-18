from app.models import db, User, Post, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random
from faker import Faker

fake = Faker()

def seed_comments():

    comments_text = [
    "Love the color scheme in this design! So vibrant.",
    "This design feels so cozy and inviting. Great work!",
    "Not my usual style, but I can appreciate the creativity!",
    "The decor perfectly complements the overall aesthetic. Well done!",
    "Had a stressful day, but looking at this design brought some calmness.",
    "Amazing post! Thanks for sharing your beautiful design.",
    "I've never seen a design like this before. It's truly unique!",
    "The combination of elements in this design is so nostalgic.",
    "How did you come up with such a brilliant design? It's absolutely stunning.",
    "Not typically a fan of this style, but this one's exceptionally good!",
    "This design has me inspired! Going to try something similar in my space.",
    "The mood of this design is just perfect. Fantastic post!",
    "Adding this to my design inspiration folder. Love it!",
    "The details in this design are so touching. Such a thoughtful approach.",
    "Was having a tough day until I saw this. If anyone's feeling stressed, take a look!",
    "The design and the photo together create such a wonderful atmosphere!",
    "Thanks for sharing your creative process!",
    "Can't stop admiring this design. So elegant and stylish!",
    "The design brings back memories of a beautiful place. Beautiful.",
    "The colors and elements in this design are so dreamy. Love it.",
    "Late-night scrolling and appreciating the beauty of design. Life is good!",
    "If you're reading this, have a great day filled with creativity!",
    "Looks like I found another favorite design. Appreciate it!",
    "To anyone reading this, let's appreciate the beauty in design together.",
    "This is hands down one of my favorite designs ever.",
    "This design, this space is a work of fine art.",
    "Notice how there isn't a single negative comment about this design? That's how you create magic.",
    "2 years later and I'm still in awe of this design. Will forever mean something to me.",
    "I really appreciate you sharing this masterpiece!",
    "Woah, it's been a while since I've seen such a stunning design.",
    "This design brings back so many memories. Thanks for sharing this moment!",
    "Very beautiful design! Loving every detail.",
    "Hey, hope you've been doing well! Your design posts are always awesome!",
    "Love everyone reading this <3",
    "Great composition! Saving this to my design inspiration collection.",
    "This design changed my mood for the better. Thank you!",
    "Hello! Randomly came across this post, but it's incredible.",
    "Appreciate the followback. You have an incredible eye for design!",
    "Love, love, love this design! Such a masterpiece.",
    "One of my absolute favorite designs as well!",
    "The photo goes REALLY well with the design. Fantastic post!",
    "It's so strange how a well-designed space can make life 10x better.",
    "This design is a vibe honestly.",
    "Everything about this post is amazing. Thank you for sharing it <3",
    "I've been having a pretty hectic day, but your design posts make it better.",
    "Design has the power to change perceptions. Feeling inspired!",
    "Yooooo, fire design!!!",
    "Adding this to my design inspiration. Thank you!",
    "Hey, it's been a while! Hope all is well with your design endeavors <3",
    "Thanks for sharing this. It made my day.",
    "Sending everyone virtual hugs. Let's keep creating beautiful spaces!",
    "Great shot! The design makes it so much better too!",
    "Design is probably humanity's best form of expression.",
    "A big hug to everyone who has ever doubted their creativity. Keep designing!",
    "This design really touched my heart. Thank you.",
    "This is not just a space. This is an art.",
    "It's little designs like this that lift me up and keep me going. <3",
    "This design means so much to a lot of people!!",
    "Hey, great seeing you're doing okay! Let's catch up soon!"
    ]

    all_users = User.query.all()
    all_posts = Post.query.all()

    comments = []

    for post in all_posts:
        commenters = [user for user in all_users if user.id != post.user_id]

        random.shuffle(commenters)
        selected_commenters = commenters[:random.choice([4, 5])]

        for commenter in selected_commenters:
            random_date_time = fake.date_time_between(start_date='-1y', end_date='now')
            comment_text = random.choice(comments_text)

            comment = Comment(
                post_id=post.id,
                user_id=commenter.id,
                text=comment_text,
                created_at=random_date_time,
                updated_at=random_date_time
            )
            comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()
    return comments



def undo_comments():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))
  db.session.commit()
