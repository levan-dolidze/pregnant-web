namespace PregnantWeb.Models
{
    public class CourseSection
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class CourseChapter
    {
        public string Chapter { get; set; }
        public List<CourseSection> Sections { get; set; }
    }
}
