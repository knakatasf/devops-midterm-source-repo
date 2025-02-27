CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON your_database_name.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE books (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    cover       VARCHAR(256) NULL,
    price       INT NOT NULL
);