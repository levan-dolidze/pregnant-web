namespace PregnantWeb.Services
{
    public interface IEmailService
    {
        Task SendAsync(string toEmail, string subject, string body);
        Task SendHtmlAsync(string toEmail, string subject, string html);
    }
}
