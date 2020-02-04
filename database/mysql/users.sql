USE db;
CREATE TABlE users (
	id INT AUTO_INCREMENT,
    	first_name VARCHAR(100),
    	last_name VARCHAR(100),
    	email VARCHAR(50),
    	password VARCHAR(200),
    	is_adimin BOOLEAN,
    	PRIMARY KEY(id)
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('ex', 'ex', 'ex@gmail.com', '####');
