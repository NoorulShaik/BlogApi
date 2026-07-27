package com.onneshon.blog.payloads;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {

	private int categoryId;
	
	private String categoryDescription;
	
	@Size(min = 3, message = "Minimum 3 character")
	private String categoryTitle;
	
}
