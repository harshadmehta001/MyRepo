using BuildIndia.Data;
using BuildIndia.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BuildIndia.Service.Repository
{
 
    interface IComplainRepository
    {
        void Save(ComplainViewModel complain);
        List<ComplainViewModel> GetAllComplains();
        ComplainViewModel GetComplains(string contactNumber);
    }
}
