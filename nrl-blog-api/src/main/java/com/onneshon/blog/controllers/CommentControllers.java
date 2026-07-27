package com.onneshon.blog.controllers;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.onneshon.blog.configs.AppConstants;
import com.onneshon.blog.entities.Role;
import com.onneshon.blog.payloads.ApiResponse;
import com.onneshon.blog.payloads.BlogDto;
import com.onneshon.blog.payloads.CommentDto;
import com.onneshon.blog.payloads.UserDto;
import com.onneshon.blog.services.CommentServices;
import com.onneshon.blog.services.UserServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CommentControllers {

	@Autowired
	private CommentServices commentServices;
	
	@Autowired
	private UserServices userServices;
	
	@PostMapping("/blog/{blogId}/comment")
	public ResponseEntity<?> addComment(
//			@Valid @RequestBody CommentDto comment
			@RequestParam("content") String content,
			@PathVariable int blogId			
			){
		
		CommentDto comment = new CommentDto();
		comment.setContent(content);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();	
		System.out.println(authentication.getName());
		UserDto user = userServices.getUserByEmail(authentication.getName());		
		comment.setUser(user);		
		
		CommentDto addedComment = commentServices.addComment(comment, blogId);		
		return ResponseEntity.ok(addedComment);
	}
	
	
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable int commentId){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDto currentUser = userServices.getUserByEmail(authentication.getName());

		// get the comment to check ownership
		com.onneshon.blog.entities.Comment comment = null;
		try {
			comment = commentServices.getCommentById(commentId);
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse("NotFound", false, "Comment not found"), HttpStatus.NOT_FOUND);
		}

		// check if user is admin
		boolean isAdmin = false;
		if (currentUser.getRoles() != null) {
			for (Role role : currentUser.getRoles()) {
				if (role.getId() == AppConstants.ROLE_ADMIN) {
					isAdmin = true;
					break;
				}
			}
		}

		// check if user is the comment author
		boolean isAuthor = comment.getUser().getId() == currentUser.getId();

		if (!isAdmin && !isAuthor) {
			Map<String, String> resp = new HashMap<>();
			resp.put("message", "You are not authorized to delete this comment!");
			return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
		}

		commentServices.deleleComment(commentId);
		ApiResponse response  = new ApiResponse("CommentDeletation", true, "Comment Deleted");
		
		return ResponseEntity.ok(response);
		
	}
	
	
	@GetMapping("/comment/blog/{blogId}")
	public ResponseEntity<?> getCommentsByBlog(@PathVariable int blogId){
		BlogDto blogDto = new BlogDto();
		blogDto.setId(blogId);
		
		List<CommentDto> commentsForBlog = commentServices.getCommentsForBlog(blogDto);
		
		return ResponseEntity.ok(commentsForBlog);
	}
	
	
}
