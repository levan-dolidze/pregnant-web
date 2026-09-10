namespace PregnantWeb.Models
{
    public class HttpResult
    {
        public int Code { get; set; }
        public string Description { get; set; }
    }

    public class ApiResponseBase<T>
    {
        public bool Success { get; set; }
        public HttpResult Result { get; set; }
        public T Data { get; set; }
        public bool Loaded { get; set; }
    }

    public class AuthUser
    {
        public int Id { get; set; }
        public string Role { get; set; }
    }

    public class AuthTokenResponse
    {
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
        public AuthUser User { get; set; }
    }
}
