using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PregnantWeb.Data;
using PregnantWeb.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Local PostgreSQL database (see appsettings.json -> ConnectionStrings:Default)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// In-memory OTP request/verify + rate limiting.
builder.Services.AddSingleton<IOtpService, OtpService>();

// Email sending via Resend's API (see appsettings.json -> Resend).
builder.Services.AddHttpClient();
builder.Services.AddScoped<IEmailService, EmailService>();

// Allow the local Angular dev server and the deployed GitHub Pages frontend to call this API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://levan-dolidze.github.io")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// JWT bearer authentication (tokens issued by AuthController.Login).
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Keep claim types exactly as issued (e.g. "role", "sub") - without
        // this, ASP.NET Core silently remaps short claim names to long
        // legacy XML-namespace URIs, which would break RequireClaim("role", ...).
        options.MapInboundClaims = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// "role" claim is set by AuthController.GenerateJwtToken from a
// config-driven admin allow-list - see appsettings.json -> Admin.
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("role", "admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Skip the http->https redirect in Development: your Angular app calls the
// http port locally, and a redirect breaks CORS preflight requests.
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowAngularDev");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
