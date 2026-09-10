namespace PregnantWeb.Models
{
    public class RequestOtp
    {
        public string MobileNumber { get; set; }
    }

    public class ConfirmOtp
    {
        public string MobileNumber { get; set; }
        public string Code { get; set; }
    }
}
