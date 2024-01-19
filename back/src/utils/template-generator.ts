export const generateResetPassTemplate = (email: string, link: string) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <style type="text/css">
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
        body {
          margin: 0;
          background-color: #fff;
        }
        table {
          border-spacing: 0;
        }
        td {
          padding: 0;
          display: table-cell;
          
        }
        img {
          border: 0;
        }
        strong {
          font-family: Inter,sans-serif;
          font-style: normal;
          font-weight: 800;
          font-size: 25px;
          text-align: center;
          color: #4e91f7;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
        }
        
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table style="
        width: 600px;
        margin-top: 100px;
        " >
          <tr>
           
          </tr>
          <tr>
            <td align="center" valign="bottom">
              <table style="  background: #fff;
              max-width: 600px;
              width: 600px;
              height: 519px;
              border-radius: 50px 50px 20px 20px;" >
                <tr>
                  <td align="center" valign="top">
                    <p
                      style="
                        margin: 0px;
                        font-family: Inter,sans-serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 25px;
                        text-align: center;
                        color: #27272a;
                        white-space: nowrap;
                      "
                    >
                    It seems, that you are trying to reset 
  
                      <p style="
                      margin: 0px;
                      font-family: Inter,sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 25px;
                      text-align: center;
                      color: #27272a;
                      padding-bottom:20px;
                    "> your password</p>
                     <p style="
                     margin: 0px;
                     font-family: Inter,sans-serif;
                     font-style: normal;
                     font-weight: 400;
                     font-size: 25px;
                     text-align: center;
                     color: #27272a;
                     padding-bottom: 20px
                   "> To do this, please follow the instructions below.</p>
                   
                    </p>
                  </td>
                </tr>
                <tr>
                  <td  valign="top" >
                    <p style=" 
                    padding-left: 175px;
                    margin: 0 ;
                    font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    color: #27272a;
                    height: 20px;
                    padding-bottom: 20px;
                    ">Your login: <span style="  font-family: Inter,sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #27272a;">${email}</span></p>
                  </td>
                </tr>
               
                <tr>
                  <td valign="top" align="center">
                    <p style="
                    font-family: Inter,sans-serif;
                     font-style: normal;
                     font-weight: 400;
                     font-size: 25px;
                     text-align: center;
                     color: #27272a;
                    margin: 0;
                    color: #27272A;
                    padding-bottom:50px;
                    ">
                   To reset your password please click "Reset"
                 
                  </p>
                  <a style="
                  width: 230px;
                  height:50px;
                  background: #4E91F7;
                  display: block;
                  text-align: center;
                  line-height: 48px;
                  font-size: 16px;
                  font-weight: 700;
                  color: #fff;
                  cursor:pointer;
                  text-decoration:none;
                  font-family: Inter,sans-serif;
                  font-style: normal;
                  margin-bottom: 30px;
              "
              href='${link}'>Reset</a>
                  </td >
                </tr>
                <tr>
                  <td  valign="top" align="center">
                   <p style="
                   font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 27px;
                    margin: 0;
                    color: #27272A;">
                    The request wasn't made by you?
                    <p style="
                   font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 27px;
                    margin: 0;
                    color: #27272A;">In that case, please ignore this message.</p>
                    
                   </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>`;
};

export const generateConfirmEmailTemp = (link: string) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <style type="text/css">
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
        body {
          margin: 0;
          background-color: #fff;
        }
        table {
          border-spacing: 0;
        }
        td {
          padding: 0;
          display: table-cell;
          
        }
        img {
          border: 0;
        }
        strong {
          font-family: Inter,sans-serif;
          font-style: normal;
          font-weight: 800;
          font-size: 25px;
          text-align: center;
          color: #4e91f7;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
        }
        
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table style="
        width: 600px;
        margin-top: 100px;
        " >
          <tr>
           
          </tr>
          <tr>
            <td align="center" valign="bottom">
              <table style="  background: #fff;
              max-width: 600px;
              width: 600px;
              height: 519px;
              border-radius: 50px 50px 20px 20px;" >
                <tr>
                  <td align="center" valign="top">
                    <p
                      style="
                        margin: 0px;
                        font-family: Inter,sans-serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 25px;
                        text-align: center;
                        color: #27272a;
                        white-space: nowrap;
                      "
                    >
                    Welcome!
                     <p style="
                     margin: 0px;
                     font-family: Inter,sans-serif;
                     font-style: normal;
                     font-weight: 400;
                     font-size: 25px;
                     text-align: center;
                     color: #27272a;
                     padding-bottom: 20px
                   "> To confirm the email address and finish the registration
                   please click on the button
                   </p>
                   
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <a style="
                    width: 230px;
                    height: 50px;
                    background: #4E91F7;
                    display: block;
                    font-size: 16px;
                    font-weight: 700;
                    color: #fff;
                    cursor:pointer;
                    text-decoration:none;
                    line-height:50px;
                    font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    margin-bottom: 30px;
                  "
                  href=${link}>Confirm Email</a>
                  </td>
                </tr>
                <tr>
                  <td  valign="top" align="center">
                   <p style="
                   font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 27px;
                    margin: 0;
                    color: #27272A;">
                    The request wasn't made by you?
                    <p style="
                   font-family: Inter,sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 27px;
                    margin: 0;
                    color: #27272A;">In that case, please ignore this message.</p>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>`;
};
