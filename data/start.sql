GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
    IDENTIFIED BY 'pass'
    WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE Scroller_db;

-- Scrolling data and save data for deep learning --
CREATE TABLE ticker(
	id INT(11) NOT NULL AUTO_INCREMENT KEY,
	id_bot INT(11) NOT NULL,
	marketName VARCHAR(20),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	high INT(11) NOT NULL,
	low INT(11) NOT NULL,
	volume FLOAT(11) NOT NULL,
	base_volume FLOAT(11) NOT NULL,
	open_buy_orders INT(11) NOT NULL,
	open_sell_orders INT(11) NOT NULL,
	moy_prev_day INT(11) NOT NULL,
	bid INT(11) NOT NULL,
	ask INT(11) NOT NULL,
	last INT(11) NOT NULL
);
