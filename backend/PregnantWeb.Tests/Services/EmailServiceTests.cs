using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using PregnantWeb.Services;
using Xunit;

namespace PregnantWeb.Tests.Services;

public class EmailServiceTests
{
    private static IConfiguration BuildConfig(string apiKey = "test-api-key", string fromAddress = "from@test.com")
    {
        return new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Resend:ApiKey"] = apiKey,
                ["Resend:FromAddress"] = fromAddress,
            })
            .Build();
    }

    [Fact]
    public async Task SendHtmlAsync_PostsExpectedRequestToResend()
    {
        var handler = new FakeHttpMessageHandler(HttpStatusCode.OK, "{}");
        var service = new EmailService(BuildConfig("my-api-key", "from@pregnantweb.ge"), new FakeHttpClientFactory(handler));

        await service.SendHtmlAsync("to@example.com", "Subject line", "<p>Hello</p>");

        Assert.NotNull(handler.LastRequest);
        Assert.Equal(HttpMethod.Post, handler.LastRequest!.Method);
        Assert.Equal("https://api.resend.com/emails", handler.LastRequest.RequestUri!.ToString());
        Assert.Equal(new AuthenticationHeaderValue("Bearer", "my-api-key"), handler.LastRequest.Headers.Authorization);

        using var payload = JsonDocument.Parse(handler.LastRequestBody!);
        var root = payload.RootElement;
        Assert.Equal("from@pregnantweb.ge", root.GetProperty("from").GetString());
        Assert.Equal("to@example.com", root.GetProperty("to")[0].GetString());
        Assert.Equal("Subject line", root.GetProperty("subject").GetString());
        Assert.Equal("<p>Hello</p>", root.GetProperty("html").GetString());
    }

    [Fact]
    public async Task SendHtmlAsync_OnFailureResponse_ThrowsWithStatusAndBody()
    {
        var handler = new FakeHttpMessageHandler(HttpStatusCode.BadRequest, "invalid \"from\" address");
        var service = new EmailService(BuildConfig(), new FakeHttpClientFactory(handler));

        var ex = await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.SendHtmlAsync("to@example.com", "Subject", "<p>Body</p>"));

        Assert.Contains("BadRequest", ex.Message);
        Assert.Contains("invalid \"from\" address", ex.Message);
    }

    [Fact]
    public async Task SendAsync_HtmlEncodesBodyAndConvertsNewlinesToBreaks()
    {
        var handler = new FakeHttpMessageHandler(HttpStatusCode.OK, "{}");
        var service = new EmailService(BuildConfig(), new FakeHttpClientFactory(handler));

        await service.SendAsync("to@example.com", "Subject", "line one <script>\nline two");

        using var payload = JsonDocument.Parse(handler.LastRequestBody!);
        var html = payload.RootElement.GetProperty("html").GetString();

        Assert.Equal("<p>line one &lt;script&gt;<br/>line two</p>", html);
    }

    private sealed class FakeHttpMessageHandler : HttpMessageHandler
    {
        private readonly HttpStatusCode _statusCode;
        private readonly string _responseBody;

        public FakeHttpMessageHandler(HttpStatusCode statusCode, string responseBody)
        {
            _statusCode = statusCode;
            _responseBody = responseBody;
        }

        public HttpRequestMessage? LastRequest { get; private set; }
        public string? LastRequestBody { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            LastRequest = request;
            LastRequestBody = request.Content is null
                ? null
                : await request.Content.ReadAsStringAsync(cancellationToken);

            return new HttpResponseMessage(_statusCode)
            {
                Content = new StringContent(_responseBody),
            };
        }
    }

    private sealed class FakeHttpClientFactory : IHttpClientFactory
    {
        private readonly HttpMessageHandler _handler;

        public FakeHttpClientFactory(HttpMessageHandler handler)
        {
            _handler = handler;
        }

        public HttpClient CreateClient(string name) => new(_handler);
    }
}
