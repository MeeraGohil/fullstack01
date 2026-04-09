-- ============================================
-- ENCAVE CAFE DATABASE SETUP
-- Run this in MySQL before starting the app
-- ============================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS encave_db;
USE encave_db;

-- Step 2: Create tables (Spring will also auto-create via JPA,
-- but run this to ensure clean setup)

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT','ADMIN') DEFAULT 'STUDENT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS encave_locations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    floor_details VARCHAR(100),
    opening_time VARCHAR(20) DEFAULT '08:00 AM',
    closing_time VARCHAR(20) DEFAULT '09:00 PM',
    timing VARCHAR(50),
    is_open BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS menu_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    location_id BIGINT,
    FOREIGN KEY (location_id) REFERENCES encave_locations(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_token VARCHAR(20) UNIQUE NOT NULL,
    user_id BIGINT,
    location_id BIGINT,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(15),
    status ENUM('PENDING','ACCEPTED','PREPARING','READY','COMPLETED','CANCELLED') DEFAULT 'PENDING',
    payment_method VARCHAR(30),
    payment_id VARCHAR(100),
    razorpay_order_id VARCHAR(100),
    total_amount DOUBLE,
    special_instructions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (location_id) REFERENCES encave_locations(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Step 3: Verify
SELECT 'Database setup complete!' AS status;
SHOW TABLES;
