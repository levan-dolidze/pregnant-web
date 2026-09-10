namespace PregnantWeb.Models
{
    public class ConfirmPasswordChangeRequest
    {
        public string PersonalNumber { get; set; }
        public string TemporaryPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
