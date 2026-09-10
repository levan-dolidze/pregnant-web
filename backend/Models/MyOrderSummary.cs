namespace PregnantWeb.Models
{
    public class MyOrderSummary
    {
        public int OrderId { get; set; }
        public CourseId ProductId { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public int LessonQty { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
