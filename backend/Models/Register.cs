namespace PregnantWeb.Models
{
    public class Register
    {

        public string SessionId { get; set; }
        public string UserName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }

        public CourseId ProductId { get; set; }
    }
}
