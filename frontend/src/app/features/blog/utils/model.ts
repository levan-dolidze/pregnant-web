export interface BlogModel {
  blogId: string;
  url: string;
  doctorFullName: string;
  date: string;
  title: string;
  content: string;
}

export class BlogSource {
  data: BlogModel[]
  loader: boolean = true
}
