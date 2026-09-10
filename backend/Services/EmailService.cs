using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PregnantWeb.Services
{
    // Sends email via Resend's API (https://resend.com) - free tier available.
    // https://resend.com/docs/api-reference/emails/send-email
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;

        public EmailService(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        public Task SendAsync(string toEmail, string subject, string body)
        {
            var html = $"<p>{WebUtility.HtmlEncode(body).Replace("\n", "<br/>")}</p>";
            return SendHtmlAsync(toEmail, subject, html);
        }

        // Unlike SendAsync, the caller is trusted to provide safe, already-
        // built HTML (e.g. containing a real <a href> link) - it is sent to
        // Resend as-is, with no encoding.
        public async Task SendHtmlAsync(string toEmail, string subject, string html)
        {
            var apiKey = _config["Resend:ApiKey"];
            var fromAddress = _config["Resend:FromAddress"];

            var payload = new
            {
                from = fromAddress,
                to = new[] { toEmail },
                subject,
                html
            };

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var json = JsonSerializer.Serialize(payload);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.resend.com/emails", content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new InvalidOperationException($"Resend send failed ({response.StatusCode}): {error}");
            }
        }
    }
}
