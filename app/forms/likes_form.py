# from flask_wtf import FlaskForm
# from wtforms import BooleanField, SubmitField, IntegerField, FormField
# from wtforms.validators import DataRequired, Length, ValidationError
# from app.models import Like

# def validate_boolean(form, field):
#     if field.data is not None and not isinstance(field.data, bool):
#         raise ValidationError("Field must be a boolean value.")

# class NewLikeForm(FlaskForm):
#   userId = IntegerField("UserId", validators=[DataRequired()])
#   postId = IntegerField("TopicId", validators=[DataRequired()])
#   like = BooleanField("Like", validators=[validate_boolean])

#   def to_dict(self):
#     return{
#       'userId': self.userId.data,
#       'postId':self.postId.data,
#       'like':self.like.data
#     }

# class EditLikeForm(FlaskForm):
#   like = BooleanField("Like", validators=[validate_boolean])

#   def to_dict(self):
#     return{
#       'like': self.like.data
#     }
