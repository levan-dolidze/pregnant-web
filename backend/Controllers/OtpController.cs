using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using PregnantWeb.Models;
using PregnantWeb.Services;

namespace PregnantWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtpController : ControllerBase
    {
        // Georgian mobile numbers: 9 digits, starting with 5 (e.g. 591880290).
        private static readonly Regex MobileNumberRegex = new(@"^5\d{8}$");

        private readonly IOtpService _otpService;

        public OtpController(IOtpService otpService)
        {
            _otpService = otpService;
        }

        [HttpPost("requestOtp")]
        public IActionResult RequestOtp([FromBody] RequestOtp request)
        {
            if (string.IsNullOrWhiteSpace(request.MobileNumber) || !MobileNumberRegex.IsMatch(request.MobileNumber))
            {
                return BadRequest(new { description = "მობილურის ნომერი არასწორია." });
            }

            if (!_otpService.TryRequestOtp(request.MobileNumber, out var code, out var error))
            {
                // Too many requests for this number within the last minute.
                return StatusCode(429, new { description = error });
            }

            // TODO: send `code` through a real SMS gateway. Included in the response
            // only for local testing until that integration exists.
            return Ok(new { description = "კოდი გამოგზავნილია.", devOtpCode = code });
        }

        [HttpPost("confirmOtp")]
        public IActionResult ConfirmOtp([FromBody] ConfirmOtp request)
        {
            if (string.IsNullOrWhiteSpace(request.MobileNumber) || !MobileNumberRegex.IsMatch(request.MobileNumber))
            {
                return BadRequest(new { description = "მობილურის ნომერი არასწორია." });
            }

            var confirmed = _otpService.ConfirmOtp(request.MobileNumber, request.Code);
            if (!confirmed)
            {
                return BadRequest(new { description = "კოდი არასწორია ან ვადაგასულია." });
            }

            return Ok(new { description = "დადასტურებულია." });
        }
    }
}
