namespace PregnantWeb.Models
{
    public class RegisterOrder
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public string UserName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public CourseId ProductId { get; set; }
        public string PaymentUrl { get; set; }
        public int? UserId { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
