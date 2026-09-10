namespace PregnantWeb.Models
{
    public class User
    {
        public int Id { get; set; }
        public string PersonalNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } = "user";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
