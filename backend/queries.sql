PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

SELECT * FROM ad
LEFT JOIN category ON category.id = ad.category_id;


