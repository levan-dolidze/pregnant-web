using PregnantWeb.Services;
using Xunit;

namespace PregnantWeb.Tests.Services;

public class OtpServiceTests
{
    private const string MobileNumber = "591880290";

    [Fact]
    public void TryRequestOtp_FirstRequest_ReturnsFourDigitCode()
    {
        var service = new OtpService();

        var ok = service.TryRequestOtp(MobileNumber, out var code, out var error);

        Assert.True(ok);
        Assert.Null(error);
        Assert.NotNull(code);
        Assert.Matches("^[0-9]{4}$", code);
    }

    [Fact]
    public void ConfirmOtp_WithCorrectCode_ReturnsTrue()
    {
        var service = new OtpService();
        service.TryRequestOtp(MobileNumber, out var code, out _);

        var confirmed = service.ConfirmOtp(MobileNumber, code);

        Assert.True(confirmed);
    }

    [Fact]
    public void ConfirmOtp_WithWrongCode_ReturnsFalse()
    {
        var service = new OtpService();
        service.TryRequestOtp(MobileNumber, out var code, out _);
        var wrongCode = code == "1111" ? "2222" : "1111";

        var confirmed = service.ConfirmOtp(MobileNumber, wrongCode);

        Assert.False(confirmed);
    }

    [Fact]
    public void ConfirmOtp_ForUnknownMobileNumber_ReturnsFalse()
    {
        var service = new OtpService();

        var confirmed = service.ConfirmOtp("599999999", "1234");

        Assert.False(confirmed);
    }

    [Fact]
    public void ConfirmOtp_IsOneTimeUse_SecondAttemptWithSameCodeFails()
    {
        var service = new OtpService();
        service.TryRequestOtp(MobileNumber, out var code, out _);

        var firstAttempt = service.ConfirmOtp(MobileNumber, code);
        var secondAttempt = service.ConfirmOtp(MobileNumber, code);

        Assert.True(firstAttempt);
        Assert.False(secondAttempt);
    }

    [Fact]
    public void TryRequestOtp_NewCodeInvalidatesPreviousCode()
    {
        var service = new OtpService();
        service.TryRequestOtp(MobileNumber, out var firstCode, out _);
        service.TryRequestOtp(MobileNumber, out var secondCode, out _);

        var confirmedWithFirstCode = service.ConfirmOtp(MobileNumber, firstCode);

        // Requesting a second code overwrites the stored entry for this number,
        // so the first code should no longer work even though it never expired.
        Assert.False(confirmedWithFirstCode || firstCode == secondCode);
    }

    [Fact]
    public void TryRequestOtp_MoreThanFiveRequestsWithinWindow_IsRateLimited()
    {
        var service = new OtpService();

        for (var i = 0; i < 5; i++)
        {
            var ok = service.TryRequestOtp(MobileNumber, out _, out var error);
            Assert.True(ok, $"Request {i + 1} should have been allowed but was rejected: {error}");
        }

        var sixthOk = service.TryRequestOtp(MobileNumber, out var sixthCode, out var sixthError);

        Assert.False(sixthOk);
        Assert.Null(sixthCode);
        Assert.NotNull(sixthError);
    }

    [Fact]
    public void TryRequestOtp_RateLimitIsPerMobileNumber()
    {
        var service = new OtpService();

        for (var i = 0; i < 5; i++)
        {
            service.TryRequestOtp(MobileNumber, out _, out _);
        }

        var otherNumberOk = service.TryRequestOtp("599111222", out var code, out var error);

        Assert.True(otherNumberOk);
        Assert.Null(error);
        Assert.NotNull(code);
    }
}
