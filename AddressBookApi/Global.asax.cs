using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using System.Web.SessionState;
using Newtonsoft.Json.Serialization;

namespace AddressBookApi
{
    public class Global : HttpApplication
    {
        protected void Application_Start()
        {
            InjectionConfig.RegisterContainers();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var formatters = GlobalConfiguration.Configuration.Formatters;
            // Avoid XML:
            formatters.XmlFormatter.SupportedMediaTypes.Clear();
            
            // camelCase all JSON:
            formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }

        private bool IsWebApiRequest()
        {
            return
                HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath
                          ?.StartsWith(WebApiConfig.UrlPrefixRelative)
                ?? false;
        }
    }
}