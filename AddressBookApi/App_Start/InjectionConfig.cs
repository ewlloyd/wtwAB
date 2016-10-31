using System.Web.Http;
using AddressBookApi.Data;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace AddressBookApi
{
    public class InjectionConfig
    {
        public static void RegisterContainers()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            container.Register<IContactRepository, SessionContactRepository>(Lifestyle.Scoped);
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}