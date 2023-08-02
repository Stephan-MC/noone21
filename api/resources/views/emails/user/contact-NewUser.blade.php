<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>New User Signup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <style type="text/css">
    a[x-apple-data-detectors] {color: inherit !important;}
  </style>

</head>
<body style="margin: 0; padding: 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0 30px 0;">

<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
  <tr>
    <td align="center" bgcolor="#f5f8fa" style="padding: 40px 0 30px 0;">
      <img src="https://noone21.com/assets/images/brand/logo1.png" alt=""  style="max-width:300;display: block;" />
    </td>
    <title>New User Signup</title>
  </tr>
  <tr>
    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
        <th>Name</th>
          <td style="color: #153643; font-family: Arial, sans-serif;">
          <?php if(isset($user_object['first_name'])){?>
               <?php echo $user_object['first_name'];?>
          <?php }?>
          </td>
        </tr>
        <tr>
        <th>Email</th>
          <td style="color: #153643; font-family: Arial, sans-serif;">
          <?php if(isset($user_object['email'])){?>
               <?php echo $user_object['email'];?>
          <?php }?>
            
          </td>
        </tr>
       
        <tr>
        <th>Phone #</th>
          <td style="color: #153643; font-family: Arial, sans-serif;">
          <?php if(isset($user_object['phone_no'])){?>
                  <?php echo $user_object['phone_no'];?>
          <?php }?>
            
          </td>
        </tr>
        <th>Return Url</th>
          <td style="643; font-familcolor: #153y: Arial, sans-serif;">
          <?php if(isset($user_object['phone_no'])){?>
                    <?php echo $user_object['returnUrl'];?>
          <?php }else{
            echo "Social Login";
            }?>
          
          </td>
        </tr>
        
       
      </table>
    </td>
  </tr>
  <tr>
    <td bgcolor="#f5f8fa" style="padding: 30px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td style="color: #2c5f73; font-family: Arial, sans-serif; font-size: 14px; width: 100%; text-align:center;">
          </td>
         
        </tr>
      </table>
    </td>
  </tr>
</table>

      </td>
    </tr>
  </table>
</body>
</html>
