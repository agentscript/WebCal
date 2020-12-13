using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using WebCal.Models;

namespace WebCal.Controllers.Api
{
    public class MathController : ApiController
    {
        private ApplicationDbContext _context;
        public MathController()
        {
            try
            {
                _context = new ApplicationDbContext();
                string _ip = GetIP();
                Session _session = new Session { IP = _ip, ReqDateTime = DateTime.Now };
                _context._Sessions.Add(_session);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                
            }
            
        }

        public String GetIP()
        {
            string ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ip))
            {
                ip = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }

            return ip;
        }


        [HttpGet]
        public double Add(double value1, double value2)
        {
            return Math.Round(value1 + value2,4);
        }


        [HttpGet]
        public double Substract(double value1, double value2)
        {
            return Math.Round(value1 - value2,4);
        }

        [HttpGet]
        public double Multiply(double value1, double value2)
        {
            return Math.Round(value1 * value2,4);
        }

        [HttpGet]
        public double Divide(double value1, double value2)
        {
            if (value2 == 0)
                return 0;

            return Math.Round(value1 / value2,4);
        }

        [HttpGet]
        public double Percentage(double value1, double value2)
        {
            if (value2 == 0)
                return 0;
            double percentage = (value1 / 100) * value2;

            return Math.Round(percentage,4);
        }


        [HttpGet]
        public string Get()
        {
            return "default";
        }
    }
}
