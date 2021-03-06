﻿using BuildIndia.Data;
using BuildIndia.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildIndia.Service.Repository
{
    public class StaffRepoistory
    {
        public void Save(StaffViewModel staffmember)
        {
            using (var _context = new NasscomEntities())
            {
                Staff staff = (from staffs in _context.Staff where staffs.Id == staffmember.Id select staffs).FirstOrDefault();
                if (staff != null)
                {
                    staff.Name = staffmember.Name;
                    staff.Phone = staffmember.Phone;
                    staff.Type = staffmember.Type;
                    staff.Email = staffmember.Email;
                }
                else
                {
                    _context.Staff.Add(GetEntity(staffmember));
                }

                _context.SaveChanges();

            }

        }
        public List<StaffViewModel> GetAllStaffMembers()
        {
            List<StaffViewModel> allStaffMembers = null;
            using(var _context = new NasscomEntities())
            {
                allStaffMembers = (from staffmembers in _context.Staff select GetModel(staffmembers)).ToList();
            }
            if (allStaffMembers != null)
            {
                return allStaffMembers;
            }
            else
                return new List<StaffViewModel>();

        }


        private Staff GetEntity(StaffViewModel staffmember)
        {
            Staff staff = new Staff()
            {
                Id = staffmember.Id,
                Email = staffmember.Email,
                Name = staffmember.Name,
                Phone = staffmember.Phone,
                Type = staffmember.Type
            };
            return staff;

        }
        private StaffViewModel GetModel(Staff staffmember)
        {
            StaffViewModel staff = new StaffViewModel()
            {
                Id = staffmember.Id,
                Email = staffmember.Email,
                Name = staffmember.Name,
                Phone = staffmember.Phone,
                Type = staffmember.Type
            };
            return staff;

        }

    }
}

