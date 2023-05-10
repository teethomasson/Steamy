using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace steamy.api.Services
{
    public class EmailService
{
    private readonly string _smtpServer;
    private readonly int _smtpPort;
    private readonly string _email;
    private readonly string _password;

    public EmailService(string smtpServer, int smtpPort, string email, string password)
    {
        _smtpServer = smtpServer;
        _smtpPort = smtpPort;
        _email = email;
        _password = password;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("",_email));
        emailMessage.To.Add(new MailboxAddress("",toEmail));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("html") { Text = body };

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpServer, _smtpPort, false);
        await client.AuthenticateAsync(_email, _password);
        await client.SendAsync(emailMessage);

        await client.DisconnectAsync(true);
    }
}
}