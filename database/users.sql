CREATE DATABASE users;
USE users;
CREATE TABlE users (
	id INT AUTO_INCREMENT,
    	first_name VARCHAR(100),
    	last_name VARCHAR(100),
    	email VARCHAR(50),
    	password VARCHAR(200),
    	is_adimin BOOLEAN,
    	PRIMARY KEY(id)
);
