using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebCal.Controllers.Api
{
    public class MathController : ApiController
    {
        [HttpGet]
        public double Add(double value1, double value2)
        {
            return value1 + value2;
        }


        [HttpGet]
        public double Substract(double value1, double value2)
        {
            return value1 - value2;
        }

        [HttpGet]
        public double Multiply(double value1, double value2)
        {
            return value1 * value2;
        }

        [HttpGet]
        public double Divide(double value1, double value2)
        {
            if (value2 == 0)
                return 0;

            return value1 / value2;
        }

        [HttpGet]
        public double Percentage(double value1, double value2)
        {
            if (value2 == 0)
                return 0;

            return (value1 / value2) * 100;
        }


        [HttpGet]
        public string Get()
        {
            return "default";
        }
    }
}
