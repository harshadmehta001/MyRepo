using BuildIndia.Service.Repository;
using BuildIndia.ViewModel;
using System.Web.Http;
using System.Web.Http.Cors;


namespace DummyWebApi.Controller
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ComplainController : ApiController
    {
        private ComplainRepository _compRepo;
       public ComplainController()
        {
            _compRepo = new ComplainRepository();
        }
        public IHttpActionResult Get()
        {
            return Ok(_compRepo.GetAllComplains());

        }
        [HttpPost]
        public IHttpActionResult PostAddVehicle(ComplainViewModel complain)
        {
            _compRepo.Save(complain);
            return Ok();
        }
    }
}
