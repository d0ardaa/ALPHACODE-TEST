CREATE DATABASE IF NOT EXISTS contact_manager;

USE contact_manager;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    birthDate DATE,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    whatsapp TINYINT(1) DEFAULT 0 CHECK (whatsapp IN (0, 1)),
    sms_notifications TINYINT(1) DEFAULT 0 CHECK (sms_notifications IN (0, 1)),
    email_notifications TINYINT(1) DEFAULT 0 CHECK (email_notifications IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email),
    UNIQUE (mobile)
);

CREATE INDEX idx_email ON contacts (email);
CREATE INDEX idx_mobile ON contacts (mobile);
