using System.Web.Http;

namespace AddressBookApi
{
    public static class WebApiConfig
    {
        public static string UrlPrefix => "api";
        public static string UrlPrefixRelative => "~/api";

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("DefaultApi",
                                       "api/{controller}/{id}",
                                       new {id = RouteParameter.Optional});
        }
    }
}