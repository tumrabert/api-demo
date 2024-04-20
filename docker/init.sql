-- init.sql
USE sw_dev;

CREATE TABLE campgrounds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  address VARCHAR(100),
  telephone_number VARCHAR(100) 
); -- Consider a more specific format for telephone_number

INSERT INTO campgrounds (name, address, telephone_number) VALUES ('campground1', '123 Bangkok', '093427828');
INSERT INTO campgrounds (name, address, telephone_number) VALUES ('campground2', '456 Songkhal', '095638398'); 
