import { ResolveFn } from '@angular/router';
import { BlogService } from '../blog.service';
import { inject } from '@angular/core';

export const blogByResolver: ResolveFn<boolean> = (route, state) => {


  const blogService = inject(BlogService);
  const blogId = (route.paramMap.get('blogId') ?? '')

  return blogService.getBlogById(blogId)

  
};
