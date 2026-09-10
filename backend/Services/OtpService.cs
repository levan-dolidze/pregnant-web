using System.Collections.Concurrent;

namespace PregnantWeb.Services
{
    // In-memory OTP store + rate limiter. Codes/rate-limit windows are short-lived,
    // so there is no need to persist them in the database.
    public class OtpService : IOtpService
    {
        private class OtpEntry
        {
            public string Code { get; set; }
            public DateTime ExpiresAt { get; set; }
        }

        private const int MaxRequestsPerWindow = 5;
        private static readonly TimeSpan RequestWindow = TimeSpan.FromHours(1);
        private static readonly TimeSpan OtpValidity = TimeSpan.FromMinutes(5);

        private readonly ConcurrentDictionary<string, List<DateTime>> _requestTimestamps = new();
        private readonly ConcurrentDictionary<string, OtpEntry> _otpCodes = new();
        private readonly Random _random = new();
        private readonly object _lock = new();

        public bool TryRequestOtp(string mobileNumber, out string code, out string error)
        {
            lock (_lock)
            {
                code = null;
                error = null;
                var now = DateTime.UtcNow;

                var timestamps = _requestTimestamps.GetOrAdd(mobileNumber, _ => new List<DateTime>());
                timestamps.RemoveAll(t => now - t > RequestWindow);

                if (timestamps.Count >= MaxRequestsPerWindow)
                {
                    error = "მოთხოვნების ლიმიტი ამოწურულია, სცადეთ მოგვიანებით.";
                    return false;
                }

                timestamps.Add(now);

                code = _random.Next(1000, 9999).ToString();
                _otpCodes[mobileNumber] = new OtpEntry { Code = code, ExpiresAt = now.Add(OtpValidity) };

                return true;
            }
        }

        public bool ConfirmOtp(string mobileNumber, string code)
        {
            lock (_lock)
            {
                if (!_otpCodes.TryGetValue(mobileNumber, out var entry))
                {
                    return false;
                }

                if (DateTime.UtcNow > entry.ExpiresAt)
                {
                    _otpCodes.TryRemove(mobileNumber, out _);
                    return false;
                }

                if (entry.Code != code)
                {
                    return false;
                }

                // One-time use.
                _otpCodes.TryRemove(mobileNumber, out _);
                return true;
            }
        }
    }
}
