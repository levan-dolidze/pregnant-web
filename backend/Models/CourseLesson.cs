namespace PregnantWeb.Models
{
    // This is the entity actually saved to the database - one row per video
    // lesson. GetCoursesMenu groups these by Chapter to build the sidebar
    // menu (Chapter/CourseSection DTOs); GetMyCourseBy looks up a single row
    // by Chapter + SectionId and returns it as a CourseLessonContent DTO.
    public class CourseLesson
    {
        public int Id { get; set; }
        public CourseId CourseId { get; set; }
        public string Chapter { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Duration { get; set; }
        public VideoTypeIds TypeId { get; set; }
    }
}
