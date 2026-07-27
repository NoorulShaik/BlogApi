package com.onneshon.blog.services;


import java.util.List;

import com.onneshon.blog.payloads.BlogDto;
import com.onneshon.blog.payloads.CommentDto;

public interface CommentServices {

	//adding comment
	CommentDto addComment(CommentDto commentDto, int blogId);
	
	//deleting comment
	void deleleComment(int commentId);
	
	List<CommentDto> getCommentsForBlog(BlogDto blog);
	
	//get comment entity by id (for ownership check)
	com.onneshon.blog.entities.Comment getCommentById(int commentId);
	
}
