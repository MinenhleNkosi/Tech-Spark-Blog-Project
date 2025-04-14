
using TechSparkBlog.Domain.Entities;

namespace TechSparkBlog.Application.Interfaces
{
    public interface IUserService
    {
        Task RegisterUserAsync(User user);
    }
}
