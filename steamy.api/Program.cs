using SteamWebAPI2.Utilities;
using Microsoft.EntityFrameworkCore;
using steamy.api.Models;
using steamy.api.Data;
using Microsoft.AspNetCore.Identity;
using steamy.api.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNet.Security.OpenId.Steam;
using AspNet.Security.OpenId;

using Microsoft.Extensions.DependencyInjection;
using steamy.api;
using System.Security.Claims;


;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton( x => new SteamWebInterfaceFactory(builder.Configuration["App:ApiKey"]));
builder.Services.AddDbContext<UserDbContext>(options =>
        options.UseSqlServer(builder.Configuration["App:DBKey"]));
builder.Services.AddSingleton<steamy.api.SteamUserService>();
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient(); 
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Angular app URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Add Identity and configure options
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<UserDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
    {
        // Configure password requirements
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
    });
builder.Services.AddSingleton(x => new EmailService(
    smtpServer: builder.Configuration["Email:SmtpServer"],
    smtpPort: int.Parse(builder.Configuration["Email:SmtpPort"]),
    email: builder.Configuration["Email:Email"],
    password: builder.Configuration["Email:Password"]
));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie()
.AddSteam(options =>
{
    options.ApplicationKey = builder.Configuration["App:ApiKey"];
    options.CallbackPath = "/signin-steam"; 
    options.Events = new OpenIdAuthenticationEvents()
    {
        OnTicketReceived = async context =>
        {
            // You can access the Steam ID via context.Principal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")
            var steamId = ulong.Parse(context.Principal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"));
            var steamUserService = context.HttpContext.RequestServices.GetRequiredService<SteamUserService>();
            var userProfile = await steamUserService.GetUserProfileAsync(steamId);

            // Save the userProfile in your database here
        }
    };
});

var app = builder.Build();

app.UseCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
