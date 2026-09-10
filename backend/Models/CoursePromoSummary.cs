namespace PregnantWeb.Models
{
    public enum CourseId
    {
        PregnantOnline=1,
        PregnantGoude
    }


    public class CoursePromoSummary
    {
        public string CourseName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int LessonQty { get; set; }
        public decimal Price { get; set; }
        public string VideoUrl { get; set; }
        public CourseId CourseId { get; set; }
    }

}
