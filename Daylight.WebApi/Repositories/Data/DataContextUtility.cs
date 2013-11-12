using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.EntityClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Daylight.WebApi.Repositories.Data
{
    /// <summary>
    /// Describes a number of Utility methods for DataContexts
    /// </summary>
    public static class DataContextUtility
    {
        /// <summary>
        /// The key in the connection strings configuration element that relates to the database this context
        /// factory should open
        /// </summary>
        private const string CONNECTION_STRING_NAME = "connectionString";

        /// <summary>
        /// The error message that is thrown when there is a error with the configuration->connectionstringname
        /// </summary>
        private const string ConnectionStringConfigurationError = "Could not load connection string '{0}' from <connectionStrings> configuration.";

        /// <summary>
        /// The error message that is thrown when there is no Namespace provided
        /// </summary>
        private const string NamespaceConfigurationError = "Namespace not specified.";

        /// <summary>
        /// Returns an EDMX formatted connection string, based on the provided connection string, and
        /// using the provided metadata namespace.
        /// </summary>
        /// <param name="connectionStringName">The name of the connection string to convert.</param>
        /// <param name="namespace">The metadata namespace.</param>
        /// <returns>An EDMX formatted connection string.</returns>
        public static string CreateEdmxConnectionString(string @namespace, string connectionStringName = CONNECTION_STRING_NAME)
        {
            // Get the connection string
            var connString = CreateConnectionString(connectionStringName);

            // Check namespace was not null
            if (@namespace == null)
            {
                throw new ConfigurationErrorsException(NamespaceConfigurationError);
            }

            // Build the appropriate EDMX String
            var builder = new EntityConnectionStringBuilder
            {
                Metadata = string.Format("res://*/{0}.csdl|res://*/{0}.ssdl|res://*/{0}.msl", @namespace),
                Provider = "System.Data.SqlClient",
                ProviderConnectionString = connString
            };

            return builder.ToString();
        }

        /// <summary>
        /// Creates the connection string.
        /// </summary>
        /// <param name="connectionStringName">The connection string.</param>
        public static string CreateConnectionString(string connectionStringName = CONNECTION_STRING_NAME)
        {
            // Get the specified connection string from the Global Configuration
            var connString = ConfigurationManager.ConnectionStrings[connectionStringName];

            // Check connection string was not null
            if (connString == null)
            {
                throw new ConfigurationErrorsException(string.Format(ConnectionStringConfigurationError, connectionStringName));
            }

            return connString.ConnectionString;
        }
    }
}
