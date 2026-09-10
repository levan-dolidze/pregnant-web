namespace PregnantWeb.Models
{
    // TODO: adjust these to match whatever video types you actually use on the frontend.
    public enum VideoTypeIds
    {
        Youtube = 1,
        Vimeo = 2
    }

    public class MyCourseByRequest
    {
        public CourseId CourseId { get; set; }
        public string Chapter { get; set; }
        public int Section { get; set; }
    }

    public class CourseLessonContent
    {
        public CourseId CourseId { get; set; }
        public string Chapter { get; set; }
        public int Section { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Duration { get; set; }
        public VideoTypeIds TypeId { get; set; }
    }
}
