using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildIndia.ViewModel
{
    public class VehicleViewModel
    {
        public string VehicleNumber { get; set; }
        public string RegistrationYear { get; set; }
        public string VehicleDetails { get; set; }
        public string ServiceProvider { get; set; }
    }

    public class ComplainViewModel
    {
        public Int32 ComplainID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Location { get; set; }

        public string Compactor { get; set; }

        public string Decription { get; set; }
    }
}
