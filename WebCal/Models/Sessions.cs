using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCal.Models
{
    public class Sessions
    {
        public string IP { get; set; } 
        public DateTime ReqDateTime { get; set; }
        public String operation { get; set; }
        public Double value1 { get; set; }
        public Double value2 { get; set; }

    }
}