using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuildIndia.Data;
using BuildIndia.ViewModel;
using System.Data.Entity;

namespace BuildIndia.Service.Repository
{
    public class VehicleRepository : IVehicleRepository
    {
        public List<VehicleViewModel> GetAllVehicles()
        {
            List<VehicleViewModel> vehicles = null;
            using (var _context = new NasscomEntities())
            {
                vehicles = (from vehicle in _context.Vehicle select GetModel(vehicle)).ToList();
            }
            if (vehicles != null)
            {
                return vehicles;
            }
            else
                return new List<VehicleViewModel>();

        }
        public VehicleViewModel GetVehicle(string vehicleNo)
        {
            VehicleViewModel vehicle = null;
            using (var _context = new NasscomEntities())
            {
                vehicle = (from vehicles in _context.Vehicle where vehicles.VehicleNo == vehicleNo select GetModel(vehicles)).FirstOrDefault();
            }
            if (vehicle != null)
            {
                return vehicle;
            }
            else
                return new VehicleViewModel();


        }
        public void Save(VehicleViewModel vehicle)
        {
            Vehicle vehiclemodel = GetEntity(vehicle);
            using (var _context = new NasscomEntities())
            {
                Vehicle vehiclecheck = _context.Vehicle.Find(vehiclemodel);
                
                if (vehiclecheck != null)
                {
                    vehiclecheck.Make = vehiclemodel.Make;
                    vehiclecheck.RegistrationDate = vehiclemodel.RegistrationDate;
                    vehiclecheck.VehicleNo = vehiclemodel.VehicleNo;
                }
                else
                {
                    _context.Vehicle.Add(vehiclemodel);
                }
                _context.SaveChanges();
            }

        }
        private Vehicle GetEntity(VehicleViewModel vehicle)
        {
            Vehicle vehicleEntity = new Vehicle()
            {
                VehicleNo = vehicle.VehicleNo,
                RegistrationDate = vehicle.RegistrationDate,
                Make = vehicle.Make
            };
            return vehicleEntity;
        }
        private VehicleViewModel GetModel(Vehicle vehicle)
        {
            VehicleViewModel vehicleModel = new VehicleViewModel()
            {
                VehicleNo = vehicle.VehicleNo,
                RegistrationDate = (DateTime)vehicle.RegistrationDate,
                Make = vehicle.Make
            };
            return vehicleModel;

        }
    }
}
