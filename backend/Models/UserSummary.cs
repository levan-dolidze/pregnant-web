namespace PregnantWeb.Models
{
    public class UserSummary
    {
        public int Id { get; set; }
        public string PersonalNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
