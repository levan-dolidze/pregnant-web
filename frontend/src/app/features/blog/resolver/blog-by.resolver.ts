import { ResolveFn } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogModel } from '../utils/model';
import { inject } from '@angular/core';

export const blogByResolver: ResolveFn<BlogModel> = (route) => {
  const blogService = inject(BlogService);
  const blogId = route.paramMap.get('blogId') ?? '';

  return blogService.getBlogById(blogId);
};
