<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('dents.sql');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }

   $sql =<<<EOF
      SELECT * from SCHEDULE;
EOF;

   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "sub_code = ". $row['sub_code'] . "\n";
      echo "day = ". $row['day'] ."\n";
      echo "session = ". $row['session'] ."\n";
      echo "type =  ".$row['type'] ."\n\n";
      echo "c_group =  ".$row['c_group'] ."\n\n";
      echo "venue =  ".$row['venue'] ."\n\n";
   }
   echo "Operation done successfully\n";
   $db->close();
?>