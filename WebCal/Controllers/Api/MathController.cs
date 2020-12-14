using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Mvc;
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

        [System.Web.Http.HttpGet]
        public IHttpActionResult Add(double value1, double value2)
        {
            return Ok(Math.Round(value1 + value2,4));
        }


        [System.Web.Http.HttpGet]
        public IHttpActionResult Substract(double value1, double value2)
        {
            return Ok(Math.Round(value1 - value2,4));
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult Multiply(double value1, double value2)
        {
            return Ok(Math.Round(value1 * value2,4));
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult Divide(double value1, double value2)
        {
            if (value2 == 0)
                return BadRequest("400: Divide by Zero");

            return Ok(Math.Round(value1 / value2,4));
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult Percentage(double value1, double value2)
        {
            if (value2 == 0)
                return BadRequest("400: Divide by Zero");
            double percentage = (value1 / 100) * value2;

            return Ok(Math.Round(percentage,4));
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult SqRoot(double value1, double value2)
        {
            
            double sqrt = (Math.Sqrt(value1));

            return Ok(Math.Round(sqrt, 4));
        }


        public string Get()
        {
            return "default";
        }
    }
}
