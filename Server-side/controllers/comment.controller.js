import { errorHandler } from "../utils/error.js";

import Comment from "../Models/comment.model.js";

export const createComment = async(req,res,next)=>{
  try {
    const {content , postId, userId} = req.body;

    if(userId !== req.user.id){
      return next(errorHandler(403, "you are not authorized to create a comment"))
    }
    const newComment = new Comment({
      content,
      postId,
      userId
    })
    await newComment.save()
    res.status(200).json(newComment);
    
  } catch (error) {
    next(error)
  }
}


export const getPostComments = async (req,res,next)=>{
  try {


    //we have to show comments on the basis of postId
    const comments = await Comment.find({postId : req.params.postId}).
    sort({createdAt:-1})
    //sort on the basis of newest one
    res.status(200).json(comments);
  } catch (error) {
    next(error)
  }
}

export const LikeComment = async(req,res,next)=>{
  try {
    const comment  = await Comment.findById(req.params.commentId);
    if(!comment){
      return next(errorHandler(404, 'Comment not found'));
    }
    //we got this user from jwt token
    //it checks that of the user exists in liked array or not
    const userIndex = comment.likes.indexOf(req.user.id);
    if(userIndex === -1){
      //if user does not exists in liked array then we have to add it
      comment.likes.push(req.user.id);
      comment.numberOfLikes+=1;
    }else{
      //if user exists in liked array then we have to remove it
      //splice means remove one user from array
      comment.likes.splice(userIndex,1);
      comment.numberOfLikes-=1;
    }
    await comment.save();
    res.status(200).json(comment);

  } catch (error) {
    
  }
}


export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to edit this comment')
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};
