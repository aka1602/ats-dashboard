import  * as  nodemailer from "nodemailer";

import    * as Mail from "nodemailer/lib/mailer";



async function main (){
  const transporter = nodemailer.createTransport({
    host :"gmail",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "prabhakardivya02@gmail.com",
      pass: "dlepyaavngyxubgz",
    },
    logger: true
  });

  
  const info = await transporter.sendMail({
    from: "prabhakardivya02@gmail.com",
    to: "divya29prabhakar@gmail.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: {path :"D:/ATS_backend/ats-dashboard/src/Amp-index.html"  },
  
      
    //"<strong>Hello world?</strong>"
    
  });

  console.log("Message sent: %s", info.response);

}
