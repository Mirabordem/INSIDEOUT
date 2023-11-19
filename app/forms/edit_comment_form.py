from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length

class EditCommentForm(FlaskForm):
    text = TextAreaField('comment', validators=[DataRequired(), Length(min=1, max=220, message='Your comment must be between 1 and 220 characters.')])
