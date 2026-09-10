namespace PregnantWeb.Services
{
    public interface IOtpService
    {
        bool TryRequestOtp(string mobileNumber, out string code, out string error);
        bool ConfirmOtp(string mobileNumber, string code);
    }
}
